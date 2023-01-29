import styled from "styled-components";
import { Button } from "Components/shared/button";

export const StyledEmptyBoard = styled.div``;
export const Text = styled.p``;
export const EmptyBoard = () => {
  return (
    <>
      <StyledEmptyBoard>
        <Text>This board is empty. Create a new column to get started.</Text>
        <Button text="+ Add New Column" />
      </StyledEmptyBoard>
    </>
  );
};
