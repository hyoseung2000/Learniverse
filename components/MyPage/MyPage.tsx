import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { IcProfileImage, IcTracker } from "@/public/assets/icons";

import { MyPageStudyRoomList } from "../RoomList";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLeader, setIsLeader] = useState(true);

  useEffect(() => {
    setLoading(true);
    setIsLeader(activeTab === 0);
  }, [activeTab]);

  const handleTabClick = (tabValue: number) => {
    if (activeTab !== tabValue) {
      setLoading(true);
      setActiveTab(tabValue);
    }
  };

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
          <IcTracker />
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

  & > p {
    width: fit-content;
    margin-bottom: 0.9rem;

    background: linear-gradient(90deg, #fff 0%, #ffbf00 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    ${({ theme }) => theme.fonts.Head2};
  }
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
