import styled from "styled-components";
import { Field } from "formik";

export const Wrapper = styled.div`
  margin: 20px;
`;
export const StyledField = styled(Field)`
  width: 100%;
  height: 48px;
  background: #f2f2f2;
  border-radius: 8px;
`;
export const StyledErrorMessage = styled.div`
  color: red;
`;
export const Label = styled.label`
  display: block;
`;
