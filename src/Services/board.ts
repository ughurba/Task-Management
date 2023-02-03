import { ICreateBoardDto, IGetAllBoardDto } from "Dtos/boardDtos";
import { http } from "./index";

export const createBoard = (board: ICreateBoardDto) => {
  const res = http.post("/board/create", {
    title: board.title,
    columns: board.columns,
  });
  return res;
};
export const getAllBoard = () => {
  const res = http.get<IGetAllBoardDto[]>("/board");
  return res;
};
export const removeBoard = (boardId: string) => {
  const res = http.delete(`/board/removeBoard/${boardId}`);
  return res;
};
