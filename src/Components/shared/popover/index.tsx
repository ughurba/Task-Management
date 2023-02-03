import Popover from "@mui/material/Popover";
import { FC, memo } from "react";
import { Content, DeleteButton, EditButton, Wrapper } from "./styled";

export interface ButtonsConfigProps {
  onEditClick?: () => void;
  onDeleteClick: () => void;
  editText: string;
  deleteText: string;
}
interface Props {
  onClose: () => void;
  anchorEl: HTMLButtonElement | null;
  buttonsConfig: ButtonsConfigProps;
}

const BasicPopover: FC<Props> = ({ onClose, anchorEl, buttonsConfig }) => {
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Wrapper>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 64, left: 1348 }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Content>
          <EditButton onClick={buttonsConfig.onEditClick}>
            {buttonsConfig.editText}
          </EditButton>
          <DeleteButton onClick={buttonsConfig.onDeleteClick}>
            {buttonsConfig.deleteText}
          </DeleteButton>
        </Content>
      </Popover>
    </Wrapper>
  );
};
export default memo(BasicPopover);
