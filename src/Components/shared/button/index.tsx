import { FC } from "react";
import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Flex } from "../flex";

interface Props extends Record<string, any> {
  text: string;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}
export const StyledButton = styled.button<{ fullWidth: boolean }>`
  background: ${({ theme }) => theme.colors.mainPurple};
  border-radius: 24px;
  width: ${(props) => (props.fullWidth ? "100%" : "164px")};
  height: 40px;
  cursor: pointer;
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.white}; ;
`;

export const Text = styled.p`
  padding: 0 20px;
`;
export const Button: FC<Props> = ({
  text,
  onClick,
  fullWidth = false,
  loading = false,
  ...rest
}) => {
  return (
    <StyledButton fullWidth={fullWidth} onClick={onClick} {...rest}>
      <Flex AlItems="center" JsContent="center">
        {loading && <CircularProgress size={24} color="inherit" />}
        <Text>{text}</Text>
      </Flex>
    </StyledButton>
  );
};
