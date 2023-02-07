import * as Yup from "yup";

export const createBoardValidation = () => {
  return Yup.object({
    title: Yup.string().max(15, "max 15").required("Required"),
    columns: Yup.array().of(Yup.string().required("Required")),
  });
};
export const createTaskValidation = () => {
  return Yup.object({
    title: Yup.string().required("Requried"),
    description: Yup.string().required("Requried"),
    columnId: Yup.string().required("Requried"),
    subTasks: Yup.array().of(Yup.string().required("Required")),
  });
};
