import styled from "styled-components";

export const Wrapper = styled.section`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  cursor: pointer;
`;
export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StyledButton = styled.button`
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.mediumGrey};
  background: none;
  border: none;
`;
export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 280px;
  height: 550px;
  background: linear-gradient(
    180deg,
    #e9effa 0%,
    rgba(233, 239, 250, 0.5) 100%
  );
  border-radius: 6px;
`;
