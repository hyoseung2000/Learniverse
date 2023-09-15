import { styled } from 'styled-components';

import { IcIssueLogo } from '@/public/assets/icons';

const Issue = () => {
  return (
    <StIsuueWrapper>
      <div>
        <IcIssueLogo />
        <div>
          <p>이대로 했는데 작동오류남 ㅠㅠ</p>
          <p>실행하면 버튼이 안생기는 오류가 나네,, 왜그런지 모르겠음 </p>
        </div>
      </div>
      <div>
        <IcIssueLogo />
        <div>
          <p>이대로 했는데 작동오류남 ㅠㅠ</p>
          <p>실행하면 버튼이 안생기는 오류가 나네,, 왜그런지 모르겠음 </p>
        </div>
      </div>
    </StIsuueWrapper>
  );
};

export default Issue;

const StIsuueWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1.5rem;
  margin-left: 0.1rem;

  & > div {
    display: flex;

    margin-bottom: 3.1rem;

    & > div > p {
      margin-left: 2.1rem;
      margin-top: 0.4rem;

      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Title5};
    }
  }
`;
