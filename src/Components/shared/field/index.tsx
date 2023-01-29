import { ErrorMessage } from "formik";

import { FC } from "react";
import { Label, StyledErrorMessage, StyledField, Wrapper } from "./styled";

export const Field: FC<Record<string, string>> = ({ name, label, ...rest }) => {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <StyledField id={name} name={name} {...rest} />
      <StyledErrorMessage>
        <ErrorMessage name={name} />
      </StyledErrorMessage>
    </Wrapper>
  );
};
