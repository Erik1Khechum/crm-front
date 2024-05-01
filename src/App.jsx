import { useRoutes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Accounts from "./pages/Accounts";
import People from "./pages/People";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AuthRoute from "./router/AuthRoute";
import NonAuthRoute from "./router/NonAuthRoute";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: (
        <NonAuthRoute>
          <HomePage />
        </NonAuthRoute>
      ),
    },
    {
      path: "login",
      element: (
        <NonAuthRoute>
          <Login />
        </NonAuthRoute>
      ),
    },
    {
      path: "account",
      element: (
        <AuthRoute>
          <Accounts />
        </AuthRoute>
      ),
    },
    {
      path: "people",
      element: (
        <AuthRoute>
          <People />
        </AuthRoute>
      ),
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return element;
}

export default App;
