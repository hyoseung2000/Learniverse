/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getMoon } from '@/apis/moon';
import {
  IcMoon0,
  IcMoon1,
  IcMoon2,
  IcMoon3,
  IcMoon4,
  IcMoonBox,
  IcProfileImage,
} from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { MoonInfo } from '@/types/member';

import { MyPageStudyRoomList } from '../RoomList';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [isLeader, setIsLeader] = useState(true);
  const [moons, setMoons] = useState<MoonInfo[]>([]);
  const [moonScores, setMoonScores] = useState<number[]>([]);
  const [isMoon, setIsMoon] = useState(false);
  const memberId = useRecoilValue(memberIdState);

  const getMoonData = async () => {
    const moonData = await getMoon(memberId);
    setMoons(moonData);
    setIsMoon(true);
  };

  const getMoonScores = () => {
    const scores = moons.map((moon) => moon.moonScore);
    setMoonScores(scores);
  };

  const matchMoonIcons = () => {
    const reversedMoonScores = [...moonScores].reverse();

    return reversedMoonScores.map((score, index) => {
      switch (score) {
        case 0:
          return <IcMoon0 key={index} />;
        case 1:
          return <IcMoon1 key={index} />;
        case 2:
          return <IcMoon2 key={index} />;
        case 3:
          return <IcMoon3 key={index} />;
        case 4:
          return <IcMoon4 key={index} />;
        default:
          return null;
      }
    });
  };

  const handleTabClick = (tabValue: number) => {
    if (activeTab !== tabValue) {
      // setLoading(true);
      setActiveTab(tabValue);
    }
  };

  useEffect(() => {
    getMoonData();
    getMoonScores();
  }, [isMoon]);

  useEffect(() => {
    // setLoading(true);
    setIsLeader(activeTab === 0);
  }, [activeTab]);

  // if (loading) return '로딩중..';

  return (
    <StMyPageWrapper>
      <h2>마이페이지</h2>
      <StMyInfo>
        <StProfile>
          <IcProfileImage />
          <p>
            <span>지민 </span>님 어서오세요 !
          </p>
        </StProfile>
        <StMoon>
          <p>나의 달</p>
          <IcMoonBox className="box" />
          <StMoonWrapper>{matchMoonIcons()}</StMoonWrapper>
        </StMoon>
      </StMyInfo>
      <StTabs>
        <button
          type="button"
          onClick={() => handleTabClick(0)}
          className={activeTab === 0 ? 'active' : ''}
        >
          내가 만든 스터디룸
        </button>
        <button
          type="button"
          onClick={() => handleTabClick(1)}
          className={activeTab === 1 ? 'active' : ''}
        >
          내가 신청한 스터디룸
        </button>
      </StTabs>
      <MyPageStudyRoomList isLeader={isLeader} />
    </StMyPageWrapper>
  );
};

export default MyPage;

const StMyPageWrapper = styled.section`
  display: flex;
  flex-direction: column;

  padding: 3.59rem 12rem 0 12rem;

  & > h2 {
    width: fit-content;

    background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
    background-clip: text;
    ${({ theme }) => theme.fonts.Head0};

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StMyInfo = styled.section`
  display: flex;
  justify-content: center;
  gap: 12.2rem;
`;

const StProfile = styled.div`
  & > p {
    margin-top: -1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
    text-align: center;

    & > span {
      color: ${({ theme }) => theme.colors.Purple2};
      ${({ theme }) => theme.fonts.Title1};
    }
  }
`;

const StMoon = styled.div`
  width: 40.5rem;
  position: relative;

  & > span {
    color: white;
    ${({ theme }) => theme.fonts.Body2};
  }
  & > p {
    width: fit-content;
    margin-bottom: 0.9rem;

    background: linear-gradient(90deg, #fff 0%, #ffbf00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${({ theme }) => theme.fonts.Head2};
  }

  .box {
    position: absolute;
    top: 4.5rem;
    left: -1rem;
  }
`;

const StMoonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;
  gap: 1rem;

  padding-top: 2.5rem;
  padding-left: 1.3rem;

  max-width: 35rem;
  box-sizing: border-box;

  z-index: 10;
`;

const StTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 4.4rem;
  margin-top: 2.7rem;

  & > button {
    color: ${({ theme }) => theme.colors.Gray3};
    ${({ theme }) => theme.fonts.Title1};

    &.active {
      color: ${({ theme }) => theme.colors.SkyBlue};
    }
  }
`;
