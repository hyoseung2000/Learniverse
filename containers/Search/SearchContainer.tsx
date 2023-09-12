import { styled } from "styled-components";

import { Search } from "@/components/Search";

const SearchContainer = () => {
  return (
    <StSearchContainer>
      <Search />
    </StSearchContainer>
  );
};

export default SearchContainer;

const StSearchContainer = styled.main`
  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
