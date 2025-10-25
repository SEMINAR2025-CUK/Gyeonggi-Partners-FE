import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SignupPage from "@/pages/SignupPage.tsx"; // 회원가입 페이지
import LoginPage from "@/pages/LoginPage.tsx"; // 로그인 페이지

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "krds-uiux/resources/cdn/krds.min.css";
import "krds-uiux/resources/cdn/krds.min.js";
//css,js 외 필요시 임포트 해서 사용 가능

createRoot(document.getElementById("root")!).render(<App />);

// 라우터 구성
const router = createBrowserRouter([
  { path: "/", element: <App /> }, // 메인
  { path: "/login", element: <LoginPage /> }, // 로그인
  { path: "/signup", element: <SignupPage /> }, // 회원가입
]);

// 라우터로 한 번만 렌더
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
