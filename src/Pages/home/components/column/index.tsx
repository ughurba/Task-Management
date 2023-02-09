import { Grid } from "@mui/material";
import { IGetColumnsDto } from "Dtos/columnDtos";
import { FC } from "react";
import styled from "styled-components";
import { Task } from "../task";

export const Title = styled.h5`
  color: black;
`;
export const Content = styled.div`
  width: 300px;
`;
export const TaskCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 23px 16px 46px 16px;
  margin-top: 20px;
`;
interface Props {
  column: IGetColumnsDto;
  onClick: (id: number) => void;
}
export const Column: FC<Props> = ({ column, onClick }) => {
  return (
    <Grid item>
      <Content>
        <Title>
          {column.title.toLocaleUpperCase()} ({column.tasks.length})
        </Title>
      </Content>
      <div>
        {column.tasks?.map((task) => (
          <TaskCard key={task.id} onClick={() => onClick(task.id)}>
            <Task task={task} />
          </TaskCard>
        ))}
      </div>
    </Grid>
  );
};
