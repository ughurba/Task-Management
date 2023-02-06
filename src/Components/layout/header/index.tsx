import { Button } from "Components/shared/button";
import { Flex } from "Components/shared/flex";
import { useSetUser } from "Hooks/useSetUser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Links } from "Routes/links";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CustomModal } from "Components/shared/modal";
import { CustomForm } from "Components/shared/form";
import { createTask } from "Services/task";
import { ICreateTaskDto } from "Dtos/createTaskDtos";
import { fetchColumns } from "Store/slices/columnSlice";
import { useAppDispatch } from "Store/hooks";
import BasicPopover, { ButtonsConfigProps } from "Components/shared/popover";
import { removeBoard } from "Services/board";
import { fetchBoards } from "Store/slices/boardSlice";
import { StyledToolbar, Title } from "./styled";

export const Header = () => {
  const { id } = useParams<{ id: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useSetUser();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate(Links.auth.login);
    }
  }, []);

  const handleCreateTask = async (values: ICreateTaskDto) => {
    const { status } = await createTask(values);

    if (status === 200) {
      if (id) {
        dispatch(fetchColumns(id));
        setOpenModal(false);
      }
    }
  };

  const handleRemoveBoard = useCallback(async () => {
    if (id) {
      const { status } = await removeBoard(id);
      if (status === 200) {
        dispatch(fetchBoards());
        navigate(Links.app.base);
        setAnchorEl(null);
      }
    }
  }, [dispatch, id, navigate]);

  const handleClosePopover = useCallback(() => setAnchorEl(null), []);

  const buttonsConfig: ButtonsConfigProps = useMemo(() => {
    return {
      deleteText: "Delete Board",
      editText: "Edit Board",
      onDeleteClick: handleRemoveBoard,
    };
  }, [handleRemoveBoard]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <StyledToolbar>
          <Title>Platform Launch</Title>
          <Flex AlItems="center">
            <Button onClick={() => setOpenModal(true)} text="+Add New Task" />

            <IconButton
              onClick={(event) => setAnchorEl(event.currentTarget)}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
            <BasicPopover
              buttonsConfig={buttonsConfig}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
            />
          </Flex>
        </StyledToolbar>
      </AppBar>
      <CustomModal
        handleCloseModal={() => setOpenModal(false)}
        openModal={openModal}
      >
        <CustomForm
          renderButton={<Button text="Create task" type="submit" />}
          initialValue={{
            title: "",
            description: "",
            columnId: 0,
            subTasks: [],
          }}
          onSubmit={handleCreateTask}
        />
      </CustomModal>
    </Box>
  );
};
