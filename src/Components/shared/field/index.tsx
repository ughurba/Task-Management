import { ErrorMessage } from "formik";

import { FC } from "react";
import { Label, StyledErrorMessage, StyledField, Wrapper } from "./styled";

export const Field: FC<Record<string, string | boolean>> = ({
  name,
  label,
  ...rest
}) => {
  return (
    <Wrapper {...rest}>
      <Label htmlFor={name as string}>{label}</Label>
      <StyledField id={name} name={name} {...rest} />
      <StyledErrorMessage>
        <ErrorMessage name={name as string} />
      </StyledErrorMessage>
    </Wrapper>
  );
};
