import { styled } from 'styled-components';

import { IcIssueLogo, IcPlusBtn } from '@/public/assets/icons';

const Issue = () => {
  return (
    <StIsuueWrapper>
      <StTitleWrapper>
        <h2>이슈</h2>
        <IcPlusBtn />
      </StTitleWrapper>
      <div>
        <IcIssueLogo />
        <div>
          <p>이대로 했는데 작동오류남 ㅠㅠ</p>
          <span>실행하면 버튼이 안생기는 오류가 나네,, 왜그런지 모르겠음 </span>
        </div>
      </div>
      <hr />
      <div>
        <IcIssueLogo />
        <div>
          <p>이대로 했는데 작동오류남 ㅠㅠ</p>
          <span>실행하면 버튼이 안생기는 오류가 나네,, 왜그런지 모르겠음 </span>
        </div>
      </div>
    </StIsuueWrapper>
  );
};

export default Issue;

const StTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StIsuueWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 2.2rem 0 2.2rem;

  & > div {
    display: flex;

    margin-top: 2rem;
    margin-bottom: 1.4rem;

    & > div > p {
      margin-left: 2.1rem;
      margin-top: 0.4rem;

      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Title5};
    }
    & > div > span {
      margin-left: 2.1rem;
      margin-top: 0.4rem;

      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Body3};
    }
  }
`;
