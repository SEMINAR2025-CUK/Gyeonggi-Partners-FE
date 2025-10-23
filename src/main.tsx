
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import "krds-uiux/resources/cdn/krds.min.css";
  import "krds-uiux/resources/cdn/krds.min.js";
  //css,js 외 필요시 임포트 해서 사용 가능


  createRoot(document.getElementById("root")!).render(<App />);
  