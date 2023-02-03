import { ICreateTaskDto } from "Dtos/createTaskDtos";
import { http } from "Services";

export const createTask = (task: ICreateTaskDto) => {
  const res = http.post(`Task/createTask`, task);
  return res;
};
