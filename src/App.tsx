import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Router from "./router/Router";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
      <Toaster richColors theme="light" position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
