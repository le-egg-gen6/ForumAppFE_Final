import LoadingPage from "@/custom_component/page/LoadingPage";
import { lazy, Suspense, type LazyExoticComponent } from "react";
import { Route, Routes } from "react-router-dom";
import type { JSX } from "react/jsx-runtime";

const Loadable = (Component: LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Component />
    </Suspense>
  );
};

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={LoginPage} />
      <Route path="/register" element={RegisterPage} />
      <Route path="/validate" element={ValidatePage} />
    </Routes>
  );
};

const LoginPage = Loadable(
  lazy(() => import("@/custom_component/page/LoginPage"))
);

const RegisterPage = Loadable(
  lazy(() => import("@/custom_component/page/RegisterPage"))
);

const ValidatePage = Loadable(
  lazy(() => import("@/custom_component/page/ValidatePage"))
);

export default Router;
