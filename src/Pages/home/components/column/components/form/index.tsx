import { Modal, Box } from "@mui/material";
import { Field } from "Components/shared/field";
import { CustomModal } from "Components/shared/modal";
import { Form, Formik } from "formik";
import { FC } from "react";

interface Props {
  fetchCreateColumn: (value: { title: string }) => void;
  openModal: boolean;
  handleCloseModal: () => void;
}
export const ColumnForm: FC<Props> = ({
  handleCloseModal,
  openModal,
  fetchCreateColumn,
}) => {
  return (
    <CustomModal handleCloseModal={handleCloseModal} openModal={openModal}>
      <Formik
        enableReinitialize
        initialValues={{
          title: "",
        }}
        onSubmit={(values) => {
          fetchCreateColumn(values);
        }}
      >
        {({ values }) => (
          <Form>
            <Field name={"title"} label="title" />
            <button type="submit">create column</button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};
