import { IColumns, ITask } from "types.d";
export const getTask = (columns: IColumns[], taskId: number) => {
  let task: ITask | undefined;
  for (let i = 0; i < columns.length; i++) {
    task = columns[i].tasks.find((task) => task.id === taskId);
    if (task) break;
  }
  return task;
};
