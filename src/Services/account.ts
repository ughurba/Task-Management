import axios from "axios";
import { RegisterProps } from "Dtos/accountDtos";

const account = axios.create({
  baseURL: "http://localhost:33033/api/account",
});

export const postRegister = (registerDto: RegisterProps) => {
  const res = account
    .post("/register", {
      email: registerDto.email,
      name: registerDto.name,
      surname: registerDto.surname,
      password: registerDto.password,
      companyName: registerDto.companyName,
      companySecretCode: registerDto.companySecretCode,
      isCreateCompany: registerDto.isCreateCompany,
    })
    .then((x) => x.status)
    .catch((err) => err.response.data);
  return res;
};

export const postLogin = (loginDto: Record<string, string>) => {
  const res = account
    .post("/login", {
      email: loginDto.email,
      password: loginDto.password,
    })
    .then((x) => x)
    .catch((err) => err.response.data);
  return res;
};
