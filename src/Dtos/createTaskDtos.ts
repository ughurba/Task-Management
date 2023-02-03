export interface ICreateTaskDto {
  title: string;
  description: string;
  subTask: string[];
  columnId: number;
}
