import { ICreateColumnDto } from "./../Dtos/columnDtos";
import { IGetColumnsDto } from "Dtos/columnDtos";
import { http } from "Services";

export const getColumns = (id: string) => {
  const res = http.get<IGetColumnsDto[]>(`/column/${id}`);
  return res;
};
export const postColumn = (column: ICreateColumnDto) => {
  const res = http.post(`/column/create`, column);
  return res;
};
