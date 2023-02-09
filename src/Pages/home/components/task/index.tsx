import { FC } from "react";
import styled from "styled-components";
import { ITask } from "types";

export const Wrapper = styled.div``;
export const Content = styled.div`
  /* background: #ffffff;
  box-shadow: 0px 4px 6px rgba(54, 78, 126, 0.101545);
  border-radius: 8px;
  padding: 23px 16px 46px 16px;
  margin-top: 20px; */
`;
export const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 19px;
  /* identical to box height */

  /* Black */

  color: #000112;
`;
export const SubTitle = styled.p`
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;

  /* Medium Grey */

  color: #828fa3;
`;

interface Props {
  task: ITask;
}

export const Task: FC<Props> = ({ task }) => {
  return (
    <Wrapper>
      <Title>{task.title}</Title>
      <SubTitle>
        {task.subTasks.filter((x) => x.completed).length} of{" "}
        {task.subTasks.length} subtasks
      </SubTitle>
    </Wrapper>
  );
};
