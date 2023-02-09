import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";
import { FC } from "react";

const Wrapper = styled.div<{ height?: string }>`
  width: 100%;
  height: ${(props) => (props.height ? props.height : "500px")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface Props {
  height?: string;
}
const Loading: FC<Props> = ({ height }) => {
  return (
    <Wrapper height={height}>
      <CircularProgress />
    </Wrapper>
  );
};
export default Loading;
