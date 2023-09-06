import { styled } from "styled-components";

import { Home } from "@/components/Home";

const HomeContainer = () => {
  return (
    <StHomeContainer>
      <Home />
    </StHomeContainer>
  );
};

export default HomeContainer;

const StHomeContainer = styled.main``;
