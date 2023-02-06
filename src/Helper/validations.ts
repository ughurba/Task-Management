import * as Yup from "yup";

export const createBoardValidation = () => {
  return Yup.object({
    title: Yup.string().max(15, "max 15").required("Required"),
  });
};
