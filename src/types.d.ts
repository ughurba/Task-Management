export interface ISubTask {
  completed: boolean;
  id: number;
  name: string;
}
export interface ITask {
  id: number;
  title: string;
  description: string;
  subTasks: ISubTask[];
  columnId: number;
}
export interface IColumns {
  id: number;
  title: string;
  tasks: ITask[];
}
