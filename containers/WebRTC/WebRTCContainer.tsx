/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Device } from 'mediasoup-client';
import {
  Consumer,
  Producer,
  RtpCapabilities,
  Transport,
  UnsupportedError,
} from 'mediasoup-client/lib/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import io from 'socket.io-client';
import { styled } from 'styled-components';

import { getProfile } from '@/apis/profile';
import Gallery from '@/components/Coretime/Gallery/Gallery';
import { TimeProvider, Timer } from '@/components/Coretime/Timer';
import useModal from '@/hooks/useModal';
import usePushNotification from '@/hooks/usePushNotification';
import {
  IcGallery,
  IcIssue,
  IcMedia,
  IcMediaOff,
  IcMike,
  IcMikeOff,
  IcSpeaker,
  IcSpeakerOff,
} from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { ProfileInfo } from '@/types/member';
import {
  ChattingInfo,
  ConsumeInfo,
  ConsumerId,
  CustomSocket,
  JoinInfo,
  MediaType,
  PeersInfo,
  RoomInfo,
  RoomPeerInfo,
} from '@/types/socket';
import { getTime } from '@/utils/getTime';

import socketPromise from './socketPromise';
import WebRTCAudio from './WebRTCAudio';
import WebRTCVideo from './WebRTCVideo';

const MEDIA_SERVER_URL = process.env.NEXT_PUBLIC_MEDIA_IP;

const WebRTCContainer = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);
  const [curName, setCurName] = useState<string>();
  const [curRoomId, setRoomId] = useState<string>();
  const pushNotification = usePushNotification();

  const [device, setDevice] = useState<Device>();
  const [socket, setSocket] = useState<CustomSocket | null>(null);
  const [curProducer, setCurProducer] = useState<string>();
  const [curMembers, setCurMembers] = useState<RoomPeerInfo[]>([]);
  const [videoStreams, setVideoStreams] = useState<ConsumeInfo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [audioStreams, setAudioStreams] = useState<ConsumeInfo[]>([]);
  const [chatting, setChatting] = useState<string>('');
  const [chattingList, setChattingList] = useState<ChattingInfo[]>([]);

  const [isMedia, setIsMedia] = useState(true);
  const [isMike, setIsMike] = useState(true);
  const [isSpeaker, setIsSpeaker] = useState(true);

  const gallery = useModal();

  // const getName = async (memberId: string) => {
  //   const profile: ProfileInfo = await getProfile(Number(memberId));
  //   console.log(profile.nickname);
  //   return profile.nickname;
  // };

  const consumeProducers = async (producers: PeersInfo[]) => {
    const consumePromises = producers.map((producer) => {
      const { producer_id, produce_type } = producer;
      return consume(producer_id, produce_type).catch((error) =>
        console.error(`Error while consuming producer ${producer_id}:`, error),
      );
    });
    await Promise.all(consumePromises);
  };

  const enterRoom = async () => {
    if (!socket || !curRoomId || !curName) return;
    try {
      await createRoom(curRoomId);
      await join(curRoomId, curName);
    } catch (error) {
      console.error('Error in creating or joining the room:', error);
    }
  };

  const connect = async () => {
    if (!curName || !curRoomId) return;
    const socketConnection: CustomSocket = await io(MEDIA_SERVER_URL!, {
      transports: ['websocket', 'polling', 'flashsocket'],
      secure: true,
    });
    socketConnection.request = await socketPromise(socketConnection);
    setSocket(socketConnection);
    console.log('1. socket connect', socketConnection);
  };

  const createRoom = async (room_id: string) => {
    if (!socket || !socket.request) return;
    try {
      await socket.request('createRoom', {
        room_id,
      });
    } catch (err) {
      console.error('Create room error:', err);
    }
    console.log('1-1. createRoom');
  };

  const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    let curDevice;
    try {
      curDevice = new Device();
      await curDevice.load({ routerRtpCapabilities });
      setDevice(curDevice);
      console.log('3. device 로딩 ', curDevice);
    } catch (error) {
      if (error instanceof UnsupportedError) {
        console.error('Browser not supported');
      } else {
        console.error(error);
      }
      return null;
    }
    return curDevice;
  };

  const join = async (room_id: string, name: string) => {
    if (!socket || !socket.request) return;
    try {
      const socketJoin: JoinInfo = await socket.request('join', {
        room_id,
        name,
      });
      console.log('2. Joined to room', socketJoin);

      const data = await socket.request('getRouterRtpCapabilities');
      await loadDevice(data);

      if (device) {
        socket.emit('getProducers');
      }
    } catch (err) {
      console.error('Join error:', err);
    }
  };

  const initSockets = async () => {
    if (!socket || !socket.request || !curName) return;

    await produce('screenType', curName);
    await produce('audioType', curName);

    const peerList: RoomInfo = await socket.request('getRoomInfo');
    console.log('4-1. peerList', peerList);
    const formatData = peerList.peers.slice(0, -2);
    await consumeProducers(formatData);

    const peers: RoomPeerInfo = await socket.request('getRoomPeerInfo');
    console.log('4-1. getRoomPeerInfo', peers);
    setCurMembers((prev) => [...prev, peers]);

    socket.on('connect_error', (error: any) => {
      console.error('socket connection error:', error.message);
    });
    socket.on('newProducers', async (data: PeersInfo[]) => {
      console.log('4. New producers (consumeList)', data);
      await consumeProducers(data);
    });
    socket.on('message', (data: ChattingInfo) => {
      setChattingList((prev) => [...prev, data]);
    });
    socket.on('consumerClosed', (data: ConsumerId) => {
      removeStream(data.consumer_id);
    });
    socket.on('disconnect', () => {
      router.push('/home');
    });
  };

  const createTransport = async (
    device: Device,
    direction: 'produce' | 'consume',
  ): Promise<Transport> => {
    if (!socket || !socket.request) throw new Error('Socket not initialized');

    const data = await socket.request('createWebRtcTransport', {
      forceTcp: false,
      rtpCapabilities:
        direction === 'produce' ? device.rtpCapabilities : undefined,
    });
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    }

    const transport =
      direction === 'produce'
        ? device.createSendTransport(data)
        : device.createRecvTransport(data);

    transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        if (!socket.request) return;
        await socket.request('connectTransport', {
          transport_id: transport.id,
          dtlsParameters,
        });
        callback();
      } catch (err) {
        errback(err as Error);
      }
    });
    if (direction === 'produce') {
      transport.on(
        'produce',
        async ({ kind, rtpParameters }, callback, errback) => {
          try {
            if (!socket.request) return;
            const producerId = await socket.request('produce', {
              producerTransportId: transport.id,
              kind,
              rtpParameters,
            });
            callback({ id: producerId.producer_id });
            setCurProducer(producerId.producer_id);
          } catch (err) {
            errback(err as Error);
          }
        },
      );
    }
    return transport;
  };

  const addStream = (
    newStream: MediaStream,
    producerId: string,
    type: string,
  ) => {
    const curStream: ConsumeInfo = {
      producer_id: producerId,
      stream: newStream,
    };
    switch (type) {
      case 'video':
        setVideoStreams((prevStreams) => [...prevStreams, curStream]);
        break;
      case 'audio':
        setAudioStreams((prevStreams) => [...prevStreams, curStream]);
        break;
      default:
        break;
    }
  };

  const produce = async (type: MediaType, memberId: string): Promise<void> => {
    try {
      if (!device || !socket || !socket.request) return;

      let stream: MediaStream;
      if (type === 'screenType') {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        addStream(stream, socket.id, 'video');
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        addStream(stream, socket.id, 'audio');
      }

      const track =
        type === 'audioType'
          ? stream.getAudioTracks()[0]
          : stream.getVideoTracks()[0];

      const producerTransport = await createTransport(device, 'produce');
      const producer = await producerTransport.produce({ track });

      producer.on('trackended', () => {
        closeProducer();
      });
    } catch (error) {
      console.error(`Error producing ${type}:`, error);
    }
  };

  const consume = async (
    producerId: string,
    produceType: string,
  ): Promise<void> => {
    try {
      if (!device || !socket || !socket.request) return;

      const consumerTransport = await createTransport(device, 'consume');
      const { rtpCapabilities } = device;

      const data = await socket.request('consume', {
        producerId,
        consumerTransportId: consumerTransport.id,
        rtpCapabilities,
      });
      const { id, kind, rtpParameters } = data;

      const consumer: Consumer = await consumerTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
      });

      const stream = new MediaStream();
      stream.addTrack(consumer.track);

      // consumer.on('transportclose', () => {
      //   console.log('Consumer transport closed');
      // });
      addStream(new MediaStream([consumer.track]), producerId, produceType);
    } catch (error) {
      console.error('Error consuming:', error);
    }
  };

  const closeProducer = () => {
    // if (curProducer) {
    //   curProducer.close();
    //   setCurProducer(undefined);
    // }
  };

  const removeStream = (producer_id: string) => {
    const filteredAudioStreams: ConsumeInfo[] = audioStreams.filter(
      (stream) => stream.producer_id !== producer_id,
    );
    const filteredVideoStreams: ConsumeInfo[] = videoStreams.filter(
      (stream) => stream.producer_id !== producer_id,
    );
    setAudioStreams(filteredAudioStreams);
    setVideoStreams(filteredVideoStreams);
  };

  const handleSendChatting = () => {
    if (!socket) return;
    socket.emit('message', chatting);

    const sentChat: ChattingInfo = {
      name: name.toString(),
      message: chatting,
      time: getTime(new Date()),
    };

    setChattingList((prev) => [...prev, sentChat]);
    setChatting('');
  };

  const handleMedia = () => {
    setIsMedia((prevState) => !prevState);
  };

  const handleMike = async () => {
    setIsMike((prevState) => !prevState);
  };

  const handleSpeaker = async () => {
    setIsSpeaker((prevState) => !prevState);
  };

  useEffect(() => {
    if (name && room_id) {
      setCurName(name as unknown as string);
      setRoomId(room_id as string);
    }
  }, [name, room_id]);

  useEffect(() => {
    if (curRoomId) {
      connect();
    }
  }, [curRoomId]);

  useEffect(() => {
    enterRoom();
  }, [socket, curRoomId, curName]);

  useEffect(() => {
    initSockets();
  }, [device]);

  useEffect(() => {
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
  }, []);

  return (
    <StWebRTCContainerWrapper>
      <StMediaContainer>
        <StSettingWrapper>
          <div>
            <TimeProvider>
              <Timer />
            </TimeProvider>
            <StSettings>
              <button type="button" onClick={handleMedia}>
                {isMedia ? <IcMedia /> : <IcMediaOff />}
              </button>
              <button type="button" onClick={handleMike}>
                {isMike ? <IcMike /> : <IcMikeOff />}
              </button>
              <button type="button" onClick={handleSpeaker}>
                {isSpeaker ? <IcSpeaker /> : <IcSpeakerOff />}
              </button>
            </StSettings>
          </div>
          <StStudyroomBtnWrapper>
            <button type="button">
              <IcIssue />
            </button>
            <button type="button" onClick={gallery.toggle}>
              <IcGallery />
            </button>
          </StStudyroomBtnWrapper>
        </StSettingWrapper>
        <StMediaWrapper>
          {videoStreams.map((stream) => (
            <WebRTCVideo
              roomId={curRoomId!}
              memberId={curName!}
              key={stream.producer_id}
              mediaStream={stream.stream}
              isSelected={selectedVideo === stream.producer_id}
              onClick={() =>
                setSelectedVideo(
                  selectedVideo === stream.producer_id
                    ? null
                    : stream.producer_id,
                )
              }
            />
          ))}
        </StMediaWrapper>
        {audioStreams.map((stream) => (
          <WebRTCAudio
            key={stream.producer_id}
            mediaStream={stream.stream}
            ismuted={!isSpeaker}
          />
        ))}
      </StMediaContainer>
      <StCoretimeInfoWrapper>
        <StChattingWrapper>
          <h3>코어타임 채팅</h3>
          <StChattings>
            {chattingList.map((chattings, index) => (
              <StChatting key={index}>
                <span>{chattings.name}</span>
                <p>{chattings.message}</p>
                <time>{chattings.time}</time>
              </StChatting>
            ))}
          </StChattings>
          <StChatInputWrapper>
            <StChatInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chatting || ''}
              onChange={(e) => setChatting(e.target.value)}
            />
            <button type="button" onClick={handleSendChatting}>
              전송
            </button>
          </StChatInputWrapper>
        </StChattingWrapper>
        <StCoreTimeBtnWrapper>
          <StExitButton type="button">코어타임 나가기</StExitButton>
        </StCoreTimeBtnWrapper>
      </StCoretimeInfoWrapper>
      <StGalleryModalWrapper $showing={gallery.isShowing}>
        <Gallery isShowing={gallery.isShowing} handleCancel={gallery.toggle} />
      </StGalleryModalWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCContainer;

const StWebRTCContainerWrapper = styled.main`
  display: grid;
  grid-template-columns: 3fr 2fr;
`;

const StMediaContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 2rem 0rem 2rem 6.5rem;
  box-sizing: border-box;
`;

const StSettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StSettings = styled.section`
  display: flex;
  gap: 0.8rem;

  & > button {
    padding: 0.6rem 0;
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;

const StMediaWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  width: fit-content;
`;

const StCoretimeInfoWrapper = styled.section`
  width: 100%;

  box-sizing: border-box;
  padding: 2rem 6.5rem 2rem 2rem;
`;

const StChattingWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 33.9rem;
  padding: 1.8rem;
  box-sizing: border-box;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 38.14%,
    rgba(238, 238, 250, 0.03) 128.32%
  );

  & > h3 {
    padding: 0 1rem 1rem 2rem;

    ${({ theme }) => theme.fonts.Title1};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChattings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;
  height: 80%;
  overflow-y: scroll;

  border-radius: 1rem;

  & > :last-child {
    margin-bottom: 2rem;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const StChatting = styled.div`
  display: grid;
  grid-template-columns: 2fr 7fr 1fr;

  width: 100%;
  height: fit-content;
  padding: 1rem;
  box-sizing: border-box;

  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.White};

  & > span {
    ${({ theme }) => theme.fonts.Body4};
    color: ${({ theme }) => theme.colors.SkyBlue};
  }
  & > p {
    ${({ theme }) => theme.fonts.Body4};
  }
  & > time {
    ${({ theme }) => theme.fonts.Body8};
    color: ${({ theme }) => theme.colors.Gray2};
  }
`;

const StChatInputWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  width: 100%;
  height: 4rem;

  border-radius: 0 0 2rem 2rem;
  background: ${({ theme }) => theme.colors.White};

  & > button {
    box-sizing: border-box;
    padding: 0.5rem 1rem;

    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.Learniverse_BG};
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StChatInput = styled.input`
  width: 75%;
  padding: 0.7rem 2rem;
  ${({ theme }) => theme.fonts.Body1};
`;

const StCoreTimeBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;

  padding-top: 3rem;
`;

const StStudyroomBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  width: fit-content;
`;

const StExitButton = styled.button`
  padding: 1.2rem 7.6rem;

  border-radius: 100rem;
  background-color: ${({ theme }) => theme.colors.Purple3};
  box-shadow: 2.47864px 4.33762px 3.71796px 1.23932px rgba(0, 0, 0, 0.15),
    0.61966px 1.23932px 7.43592px 4.33762px rgba(153, 153, 153, 0.3) inset,
    0.61966px 1.23932px 8.67524px 4.33762px rgba(255, 255, 255, 0.15) inset;

  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Title2};
`;

const StGalleryModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
