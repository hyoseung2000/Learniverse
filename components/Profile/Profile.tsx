import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { postProfile } from '@/apis/profile';
import { useGetMemberProfile } from '@/hooks/members';
import { IcProfileImage } from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { PostProfileInfo } from '@/types/member';

const Profile = () => {
  const memberId = useRecoilValue(memberIdState);
  const { imgUrl, nickname, memberMessage } = useGetMemberProfile(memberId);

  const [CnickName, setCNickName] = useState('');
  const [Cmessage, setCMessage] = useState('');
  const [profileData, setProfileData] = useState<PostProfileInfo>();

  const handleCancel = () => {
    initData();
  };

  const handleModify = async () => {
    await postProfile(profileData!);
  };

  const initData = () => {
    setCNickName(nickname!);
    setCMessage(memberMessage ? memberMessage! : '');
  };

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    setProfileData({
      memberId,
      nickname: CnickName,
      memberMessage: Cmessage,
    });
  }, [CnickName, Cmessage]);

  return (
    <StProfileWrapper>
      <StProfileBox>
        <h1>프로필을 설정해주세요!</h1>
        <StProfile>
          {imgUrl && (
            <StProfileImage>
              <IcProfileImage />
              <Image
                className="profileImage"
                src={imgUrl}
                alt="profile"
                width={77}
                height={70}
              />
            </StProfileImage>
          )}
          <StInfo>
            <p>닉네임</p>
            <input
              type="text"
              value={CnickName}
              onChange={(e) => {
                setCNickName(e.target.value);
              }}
            />
            <p>상태 메시지</p>
            <input
              type="text"
              value={Cmessage}
              maxLength={20}
              placeholder="상태 메시지를 입력하세요."
              onChange={(e) => {
                setCMessage(e.target.value);
              }}
            />
          </StInfo>
        </StProfile>
        <StBtnWrapper>
          <StModifyButton className="modify" onClick={handleModify}>
            수정하기
          </StModifyButton>
          <StCancelButton className="cancel" onClick={handleCancel}>
            취소
          </StCancelButton>
        </StBtnWrapper>
      </StProfileBox>
    </StProfileWrapper>
  );
};

export default Profile;

const StProfileWrapper = styled.div`
  height: 60rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StProfileBox = styled.div`
  width: 62rem;
  height: 36rem;

  & > h1 {
    margin: 3.7rem 0 0 5rem;
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head2};
  }

  background: linear-gradient(
    46deg,
    rgba(238, 238, 250, 0.3) 7%,
    rgba(238, 238, 250, 0.3) 57%,
    rgba(238, 238, 250, 0) 100%
  );
  box-shadow: -5px -5px 20px rgba(255, 255, 255, 0.3) inset;
  border-radius: 4rem;
  backdrop-filter: blur(20px);
`;

const StProfileImage = styled.div`
  position: relative;

  & > .profileImage {
    position: absolute;
    top: 7.7rem;
    left: 6.45rem;

    border-radius: 10rem;
  }
`;

const StProfile = styled.div`
  display: flex;
  margin-left: 4rem;
`;

const StInfo = styled.div`
  display: flex;
  flex-direction: column;

  margin: 3rem 2rem;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body3};
  }

  & > input {
    width: 30.5rem;
    height: 3.9rem;
    margin-bottom: 2rem;

    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.White};

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body4};
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 2rem;

  margin-right: 5rem;
  margin-bottom: 5rem;
`;

const StModifyButton = styled.button`
  width: 11.6rem;
  height: 3.4rem;

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Title5};

  background: linear-gradient(93deg, #9985fe 1%, #93cdfd 100%);
  box-shadow: 2.791367530822754px 4.88489294052124px 4.187050819396973px
    1.395683765411377px rgba(0, 0, 0, 0.15);
  border-radius: 6.5rem;
`;

const StCancelButton = styled.button`
  width: 11.6rem;
  height: 3.4rem;

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Title5};

  // border-color: linear-gradient(93deg, #9985fe 1%, #93cdfd 100%);
  box-shadow: 2.791367530822754px 4.88489294052124px 4.187050819396973px
    1.395683765411377px rgba(0, 0, 0, 0.15);
  border-radius: 6.5rem;
  border: 1.35px #9985fe solid;
`;
