import { createBrowserRouter } from "react-router-dom";

// Importando as página

import Login from "./pages/Login/Login.jsx";
import PaginaErro from "./pages/PaginaErro/PaginaErro.jsx";
import Home from "./pages/Home/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <PaginaErro />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
   {
    path: "/",
    // element: <RotasProtegidas />,
    errorElement: <PaginaErro />,
    children: [
        {
            path: "home",
            element: <Home />
        }
    ]
  }
]);

export default router;
