import { http } from "Services";

export const updateSubTask = (subTaskId: number, completed: boolean) => {
  const res = http.put(
    `/SubTask/updateSubTask?subTaskId=${subTaskId}&completed=${completed}`
  );
  return res;
};

export const getSubTasks = (taskId: number) => {
  const res = http.get(`/SubTask/getSubTask?taskId=${taskId}`);
  return res;
};
