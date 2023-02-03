import styled, { css } from "styled-components";

const ButtonStyle = css`
  background: none;
  border: none;
  font-weight: 500;
  font-size: 13px;
  line-height: 1.7;
  display: block;
  padding-left: 16px;
  padding-top: 16px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export const Wrapper = styled.div``;
export const Content = styled.div`
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
  border-radius: 8px;
  width: 192px;
`;
export const EditButton = styled.button`
  ${ButtonStyle}
  color: #828fa3;
`;
export const DeleteButton = styled.button`
  ${ButtonStyle}
  padding-bottom: 16px;
  color: #ea5555;
`;
