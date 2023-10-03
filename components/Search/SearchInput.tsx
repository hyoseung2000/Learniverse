import { useState } from 'react';
import { styled } from 'styled-components';

import { IcSearch } from '@/public/assets/icons';

interface SearchInputProps {
  handleSearch: (searchInput: string) => Promise<void>;
}
const SearchInput = ({ handleSearch }: SearchInputProps) => {
  const [selectedInput, setSelectedInput] = useState(1);
  const [searchInput, setSearchInputInput] = useState('');

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedInput(Number(e.target.value));
  };
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInputInput(e.target.value);
  };
  const onSearch = () => {
    handleSearch(searchInput);
  };
  return (
    <StSearchInputWrapper>
      <StRadioWrapper>
        <StRadio>
          <input
            type="radio"
            id="roomName"
            value={0}
            checked={selectedInput === 0}
            onChange={handleRadioChange}
          />
          <span />방 이름
        </StRadio>
        <StRadio>
          <input
            type="radio"
            id="tag"
            value={1}
            checked={selectedInput === 1}
            onChange={handleRadioChange}
          />
          <span />
          해시태그
        </StRadio>
      </StRadioWrapper>

      <StInputWrapper>
        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="방 이름 또는 해시태그를 입력해주세요."
        />
        <StIconWrapper>
          <IcSearch />
          <button type="button" onClick={onSearch}>
            버튼
          </button>
        </StIconWrapper>
      </StInputWrapper>
    </StSearchInputWrapper>
  );
};

export default SearchInput;

const StSearchInputWrapper = styled.div`
  margin-top: 5.6rem;
  margin-bottom: 2rem;
`;

const StRadioWrapper = styled.div`
  display: flex;
  gap: 1rem;

  margin-left: 3.5rem;
  padding-bottom: 1rem;
`;

const StRadio = styled.label`
  display: inline-flex;
  align-items: center;

  margin-right: 1rem;

  ${({ theme }) => theme.fonts.Body2};
  color: ${({ theme }) => theme.colors.White};

  cursor: pointer;

  input[type='radio'] {
    display: none;
  }

  span {
    display: inline-block;
    position: relative;

    width: 2rem;
    height: 2rem;
    border: 0.25rem solid ${({ theme }) => theme.colors.Purple3};
    border-radius: 5rem;
    margin-right: 0.9rem;

    &:after {
      content: '';
      position: absolute;
      top: 0.55rem;
      left: 0.55rem;
      width: 0.9rem;
      height: 0.9rem;

      background-color: ${({ theme }) => theme.colors.Purple3};
      border-radius: 2rem;
      opacity: 0;
    }
  }

  input[type='radio']:checked + span:after {
    opacity: 1;
  }
`;

const StInputWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 61.6rem;

  & > input {
    z-index: 1;

    width: 80%;
    height: 6.6rem;
    margin-top: 0.3rem;
    padding-left: 1rem;

    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.Black};
    ${({ theme }) => theme.fonts.Body1};

    &::placeholder {
      color: ${({ theme }) => theme.colors.Black};
    }
    &:focus {
      outline: none;
    }
  }
  & > button {
    z-index: 1;

    width: 7.3rem;
    height: 7.3rem;
    margin-top: 0.2rem;
    margin-left: 1.6rem;

    border-radius: 5rem;
  }
`;

const StIconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
