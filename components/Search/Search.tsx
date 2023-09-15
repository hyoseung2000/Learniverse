import { styled } from 'styled-components';

import { PurpleButton } from '../Common/Button';
import { AllStudyroomList } from '../RoomList';
import SearchInput from './SearchInput';

const Search = () => {
  const handleRecommend = () => {
    console.log('스터디 추천 : 2차 데모 이후 개발');
  };
  return (
    <StSearchWrapper>
      <h1>스터디 검색</h1>
      <SearchInput />
      <PurpleButton
        btnName="✨ 나와 맞는 스터디 추천받기"
        handleClick={handleRecommend}
      />
      <AllStudyroomList />
    </StSearchWrapper>
  );
};

export default Search;

const StSearchWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.59rem 12rem 0 12rem;

  & > h1 {
    width: 100%;
    text-align: left;
    background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
    background-clip: text;
    ${({ theme }) => theme.fonts.Head0};

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
