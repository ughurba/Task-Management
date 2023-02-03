import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "../Layouts/appLayouts/AppLayouts";
import { Home, Login, Register } from "../Pages";
import { Links } from "./links";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path={Links.app.base} element={<AppLayout />}>
            <Route path={`${Links.app.home}/:id`} element={<Home />} />
          </Route>
          <Route path={Links.auth.login} element={<Login />} />
          <Route path={Links.auth.register} element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
