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
import { fetchColumns, columnActions } from "Store/slices/columnSlice";
import { useActionCreators, useAppDispatch } from "Store/hooks";
import BasicPopover, { ButtonsConfigProps } from "Components/shared/popover";
import { removeBoard } from "Services/board";
import { fetchBoards, boardActions } from "Store/slices/boardSlice";
import { StyledToolbar, Title } from "./styled";
import { createTaskValidation } from "Helper/validations";
import { toast } from "react-toastify";
const allActionsColumn = {
  ...columnActions,
  fetchColumns,
};
const allActionsBoard = {
  ...boardActions,
  fetchBoards,
};

export const Header = () => {
  const { id } = useParams<{ id: string }>();
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [createTaskObject, setCreateTaskObject] = useState<{
    isLoading?: boolean;
    error?: string;
  }>({
    error: "",
    isLoading: false,
  });
  const navigate = useNavigate();

  const actions = useActionCreators({
    ...allActionsColumn,
    ...allActionsBoard,
  });
  useSetUser();
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate(Links.auth.login);
    }
  }, []);

  const handleCreateTask = async (values: ICreateTaskDto) => {
    setCreateTaskObject({ isLoading: true });

    const { status, data } = await createTask(values);

    if (status === 200) {
      if (id) {
        actions.fetchColumns(id);
        setOpenModal(false);
        setCreateTaskObject({ isLoading: false });
        toast.success("task elave olundu");
      }
    } else if (status === 400) {
      setCreateTaskObject({ error: data });
    }
  };

  const handleRemoveBoard = useCallback(async () => {
    if (id) {
      const { status } = await removeBoard(id);
      if (status === 200) {
        actions.fetchBoards();
        navigate(Links.app.base);
        setAnchorEl(null);
      }
    }
  }, [id, navigate, actions]);

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
        <div>{createTaskObject?.error}</div>

        <CustomForm
          onValidationSchema={createTaskValidation()}
          renderButton={
            <Button
              loading={createTaskObject.isLoading}
              fullWidth
              text="Create task"
              type="submit"
            />
          }
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
