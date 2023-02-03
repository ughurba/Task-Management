import { FC } from "react";
import styled from "styled-components";

interface Props {
  text: string;
  onClick?: () => void;
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
export const Button: FC<Props> = ({ text, onClick }) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};
