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
interface Props {
  column: IGetColumnsDto;
}
export const Column: FC<Props> = ({ column }) => {
  return (
    <Grid item>
      <Content>
        <Title>
          {column.title.toLocaleUpperCase()} ({column.tasks.length})
        </Title>
      </Content>
      <div>
        {column.tasks?.map((task) => (
          <Task task={task} />
        ))}
      </div>
    </Grid>
  );
};
