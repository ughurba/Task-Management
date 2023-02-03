import { IColumns } from "./../types.d";
import { ICreateColumnDto } from "./../Dtos/columnDtos";
import { IGetColumnsDto } from "Dtos/columnDtos";
import { http } from "Services";

export const getColumns = (boardId: string) => {
  const res = http.get<IGetColumnsDto[] | IColumns[]>(`/column/${boardId}`);
  return res;
};
export const postColumn = (column: ICreateColumnDto) => {
  const res = http.post(`/column/create`, column);
  return res;
};
