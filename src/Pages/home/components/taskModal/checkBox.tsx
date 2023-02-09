import { Checkbox } from "@mui/material";
import { FC, useState } from "react";
import { updateSubTask } from "Services/subTask";
import { ISubTask } from "types";
import { SubTask, SubTaskContent } from "./styled";

interface Props {
  subTask: ISubTask;
}
export const Check: FC<Props> = ({ subTask }) => {
  const [check, setCheck] = useState(subTask.completed);

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    setCheck(event.target.checked);
    updateSubTask(id, event.target.checked);
  };
  return (
    <SubTaskContent key={subTask.id}>
      <Checkbox
        checked={check}
        onChange={(ev) => handleChange(ev, subTask.id)}
      />
      <SubTask check={check}>{subTask.name}</SubTask>
    </SubTaskContent>
  );
};
