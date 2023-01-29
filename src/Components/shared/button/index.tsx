import { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
}
export const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.mainPurple};
  border-radius: 24px;
  padding: 15px 25px;
  cursor: pointer;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.white}; ;
`;
export const Button: FC<Props> = ({ text }) => {
  return <StyledButton>{text}</StyledButton>;
};
