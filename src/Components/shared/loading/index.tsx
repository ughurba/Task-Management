import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default function Loading() {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
}
