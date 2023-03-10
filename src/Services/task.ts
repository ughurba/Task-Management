import { ICreateTaskDto } from "Dtos/createTaskDtos";
import { http } from "Services";

export const createTask = (task: ICreateTaskDto) => {
  const res = http.post(`Task/createTask`, task);
  return res;
};
export const updateStatusTask = (taskId: number, columnId: string) => {
  const res = http.put(`Task/taskUpdate?columnId=${columnId}&taskId=${taskId}`);
  return res;
};
