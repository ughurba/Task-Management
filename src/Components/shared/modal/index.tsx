import { Box, Modal } from "@mui/material";
import { FC, ReactNode } from "react";

interface Props {
  openModal: boolean;
  handleCloseModal: () => void;
  children: ReactNode;
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export const CustomModal: FC<Props> = ({
  handleCloseModal,
  openModal,
  children,
}) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
};
