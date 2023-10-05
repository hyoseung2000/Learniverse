import { styled } from 'styled-components';

const SignUp = () => {
  return (
    <StSignUpWrapper>
      <h1>관심 있는 스터디를 선택해주세요! (3~5개)</h1>
      <h1>유사한 스터디들을 추천해드릴게요.</h1>
    </StSignUpWrapper>
  );
};

export default SignUp;

const StSignUpWrapper = styled.div`
  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};
  }
`;
