export interface ITask {
  id: number;
  title: string;
  description: string;
}
export interface IColumns {
  id: number;
  title: string;
  tasks: ITask[];
}
