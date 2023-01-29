import { lazy } from "react";

const Login = lazy(() => import("./auth/login"));
const Register = lazy(() => import("./auth/register"));
const Home = lazy(() => import("./home"));
export { Login, Register, Home };
