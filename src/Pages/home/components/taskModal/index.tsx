import {
  Box,
  Checkbox,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Flex } from "Components/shared/flex";
import { FC, useEffect, useMemo, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Title,
  CurrentStatus,
  Description,
  Label,
  SubTask,
  SubTaskContent,
  SubTasksWrapper,
  Text,
} from "./styled";
import { ITask } from "types";
import { updateSubTask } from "Services/subTask";
import { fetchColumns } from "Store/slices/columnSlice";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { useParams } from "react-router-dom";
import { Check } from "./checkBox";
import { getColumns } from "Services/coulmn";
import { fetchSubTasks, subTaskActions } from "Store/slices/subTaskSlice";
import { Status } from "Helper/enums";
import Loading from "Components/shared/loading";
import { updateStatusTask } from "Services/task";

interface Props {
  task: ITask;
  openModal: boolean;
  handleCloseModal: () => void;
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

export const TaskModal: FC<Props> = ({ handleCloseModal, openModal, task }) => {
  const { subTasks, status: subTaskStatus } = useAppSelector(
    (state) => state.subTasks
  );
  const { column } = useAppSelector((state) => state.columns);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [status, setStatus] = useState<string | undefined>(
    column?.find((x) => x.id === task.columnId)?.id.toString()
  );

  const handleChangeStatus = async (event: SelectChangeEvent) => {
    setStatus(event.target.value);
    const { status } = await updateStatusTask(task.id, event.target.value);
  };
  useEffect(() => {
    dispatch(fetchSubTasks(task.id));

    return () => {
      dispatch(subTaskActions.reset());
      if (id) {
        dispatch(fetchColumns(id));
      }
    };
  }, [task.id, dispatch]);
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Flex AlItems="center" JsContent="space-between">
          <Title>{task?.title}</Title>
          <MoreVertIcon />
        </Flex>

        <Description>{task?.description}</Description>
        <SubTasksWrapper>
          {subTaskStatus === Status.loading ? (
            <Loading height=" " />
          ) : (
            <>
              <Text>
                Subtasks ({subTasks.filter((x) => x.completed).length} of{" "}
                {subTasks.length})
              </Text>
              {subTasks?.map((item) => (
                <Check key={item.id} subTask={item} />
              ))}
            </>
          )}
        </SubTasksWrapper>
        <CurrentStatus>
          <Label>Current Status</Label>
          <Select
            fullWidth
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={status}
            onChange={handleChangeStatus}
          >
            {column.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </CurrentStatus>
      </Box>
    </Modal>
  );
};
