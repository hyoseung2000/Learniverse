import { styled } from "styled-components";

import { IcPlanet } from "@/public/assets/icons";
import { studyRoomInfo } from "@/types/studyroom";
import { getCategoryColor } from "@/utils/getCategoryColor";

interface StudyroomCardProps {
  roomData: studyRoomInfo;
}

const StudyroomCard = ({ roomData }: StudyroomCardProps) => {
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
    <StStudyroomCardWrapper planetColor={planetColor}>
      <IcPlanet />
      <br />
      {roomName}
      <br />
      {hashtags}
      <br />
      {roomCategory}
      <br />
      {roomIntro}
      <br />
      {roomLimit}
    </StStudyroomCardWrapper>
  );
};

export default StudyroomCard;

const StStudyroomCardWrapper = styled.article<{ planetColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  width: 14.1rem;
  height: 18.6rem;

  border-radius: 1.6rem;
  box-shadow: 2.79591px 2.79591px 5.59181px 3.49488px rgba(0, 0, 0, 0.24);
  background: ${({ theme }) => theme.colors.White};
  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Title5};

  cursor: pointer;

  & > svg {
    path {
      fill: ${({ planetColor }) => planetColor};
    }
  }
`;
