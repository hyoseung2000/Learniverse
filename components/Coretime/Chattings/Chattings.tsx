import { styled } from 'styled-components';

import { ChattingInfo } from '@/types/socket';

interface ChattingsProps {
  chattingList: ChattingInfo[];
}

const Chattings = ({ chattingList }: ChattingsProps) => {
  return (
    <>
      <h3>코어타임 채팅</h3>
      <StChattings>
        {chattingList.map((chattings) => (
          <StChatting
            key={`${chattings.name}-${chattings.message}-${chattings.time}`}
          >
            <span>{chattings.name}</span>
            <p>{chattings.message}</p>
            <time>{chattings.time}</time>
          </StChatting>
        ))}
      </StChattings>
    </>
  );
};

export default Chattings;

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
