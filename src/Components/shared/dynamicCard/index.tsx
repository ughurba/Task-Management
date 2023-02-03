import { Form, Formik } from "formik";
import React, { JSXElementConstructor, ReactElement } from "react";
import { FC } from "react";

interface Props {
  children: JSX.Element | any;
  initialValue: object;
  onSubmit: <T>(values: T) => void;
}

const getClonedChildren = (children: JSX.Element) => {
  return React.Children.map(
    children,
    (child) =>
      !child.props.hidden &&
      React.cloneElement(
        child as ReactElement<any, string | JSXElementConstructor<any>>
      )
  );
};
export const DynamicCard: FC<Props> = ({
  children,
  initialValue,
  onSubmit,
}) => {
  console.log(getClonedChildren(children));
  return (
    <Formik
      enableReinitialize
      initialValues={initialValue}
      onSubmit={(values) => onSubmit(values)}
    >
      {(props) => (
        <>
          <Form>
            {getClonedChildren(children)} {children(props)}
          </Form>
        </>
      )}
    </Formik>
  );
};
