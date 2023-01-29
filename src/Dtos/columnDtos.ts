import { ITask } from "types.d";
export interface IGetColumnsDto {
  id: number;
  title: string;
  tasks: ITask[];
}
export interface ICreateColumnDto {
  boardId: string;
  title: string;
}
