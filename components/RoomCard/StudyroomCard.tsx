import { styled } from "styled-components";

import { IcPlanet } from "@/public/assets/icons";
import { studyRoomInfo } from "@/types/studyroom";
import { getCategoryColor } from "@/utils/getCategoryColor";

interface StudyroomCardProps {
  roomType?: string;
  roomData: studyRoomInfo;
}

const StudyroomCard = ({ roomData, roomType }: StudyroomCardProps) => {
  const {
    roomId,
    roomName,
    roomIntro,
    hashtags,
    roomCategory,
    roomCount,
    roomLimit,
    isMember,
  } = roomData;

  const planetColor = getCategoryColor(roomCategory);

  return (
    <StCardWrapper>
      <StStudyroomCardWrapper>
        <StIconWrapper planetColor={planetColor}>
          <IcPlanet />
        </StIconWrapper>
        <StRoomName>{roomName}</StRoomName>
        <StHashtags>
          {hashtags.map((hashtag) => (
            <li key={hashtag}>#{hashtag}</li>
          ))}
        </StHashtags>
        <StCategory>{roomCategory}</StCategory>
        <StIntro>{roomIntro}</StIntro>
        <StJoinWrapper>
          <StLimit>
            정원
            <span> {roomLimit}</span> / 5명
          </StLimit>
          {/* <StJoin type="button" disabled={roomLimit === 5}> */}
          <StJoin type="button">입장</StJoin>
        </StJoinWrapper>
      </StStudyroomCardWrapper>
      {roomType === 'leader' ? (
        <StBtnWrapper>
          <button type="button" className="manage">
            신청자 관리
          </button>
          <button type="button" className="edit">
            스터디 정보수정
          </button>
        </StBtnWrapper>
      ) : roomType === 'apply' ? (
        <StStatusWrapper memberStatus={isMember}>
          신청 현황 <span>{isMember}</span>
        </StStatusWrapper>
      ) : (
        <></>
      )}
    </StCardWrapper>
  );
};

export default StudyroomCard;

const StCardWrapper = styled.div`
  width: 14.1rem;
`;

const StStudyroomCardWrapper = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 18.6rem;
  padding: 1.8rem 1.9rem;
  box-sizing: border-box;

  border-radius: 1.6rem;
  box-shadow: 2.79591px 2.79591px 5.59181px 3.49488px rgba(0, 0, 0, 0.24);
  background: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Title5};

  cursor: pointer;
`;

const StIconWrapper = styled.div<{ planetColor: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 5.2rem;

  & > svg {
    width: 3.5rem;
    height: 3.5rem;
    margin-top: 0.4rem;

    path {
      fill: ${({ planetColor }) => planetColor};
    }
  }
`;
const StRoomName = styled.p`
  ${({ theme }) => theme.fonts.Body2};
  text-align: center;
`;

const StHashtags = styled.ol`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  overflow: hidden;

  width: 100%;
  height: 2rem;
  max-width: 100%;
  margin: 0.6rem 0;

  & > li {
    display: inline-block;

    padding: 0.2rem 0.5rem;

    border-radius: 1.6rem;
    background-color: ${({ theme }) => theme.colors.Gray4};
    color: ${({ theme }) => theme.colors.Gray1};
    ${({ theme }) => theme.fonts.Body9};

    font-size: 0.6rem;
    font-style: normal;
    font-weight: 500;
  }
`;

const StCategory = styled.p`
  margin-bottom: 0.3rem;

  color: ${({ theme }) => theme.colors.Purple4};
  ${({ theme }) => theme.fonts.Body6};
`;

const StIntro = styled.p`
  margin-bottom: 0.5rem;

  width: 100%;
  height: 1.3rem;
  overflow: hidden;

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body8};
`;

const StJoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const StLimit = styled.p`
  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body6};

  & > span {
    color: ${({ theme }) => theme.colors.Orange1};
    ${({ theme }) => theme.fonts.Body6};
  }
`;

const StJoin = styled.button`
  padding: 0.2rem 0.7rem;

  border-radius: 0.4rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.Gray4 : theme.colors.Yellow2};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.White : theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body8};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 0.6rem;

  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;

  & > button {
    padding: 0.3rem 0.45rem;

    border-radius: 0.5rem;
    ${({ theme }) => theme.fonts.Body6};
  }
  .manage {
    color: ${({ theme }) => theme.colors.LightGray2};
    background-color: ${({ theme }) => theme.colors.Purple3};
  }
  .edit {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.SkyBlue};
  }
`;

const StStatusWrapper = styled.div<{ memberStatus: string }>`
  display: flex;
  justify-content: center;
  gap: 0.3rem;

  margin-top: 0.3rem;

  color: ${({ theme }) => theme.colors.LightGray1};
  ${({ theme }) => theme.fonts.Title5};

  & > span {
    margin-top: 0.3rem;
    margin-left: 2.4rem;
    padding: 0rem 0.3rem;

    border-radius: 0.4rem;
    ${({ theme }) => theme.fonts.Body4};
    /* background-color: ${({ theme }) => theme.colors.Green}; */
    background-color: ${({ memberStatus, theme }) => {
      switch (memberStatus) {
        case '승인':
          return '#0ACF84';
        case '거절':
          return '#F14E1C';
        case '대기':
          return '#26C6DA';
        default:
          return 'transparent';
      }
    }};
  }
`;
