import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchPage from "./SearchPage"
import SearchByPars from "./SearchByPars";
import SearchByPartTime from "./SearchByPartTime";
import SearchByFullTime from "./SearchByFullTime"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SearchPage />,
    },
    {
      path: "/searchByPars",
      element: <SearchByPars />,
    },
    {
      path: "/searchByPartTime",
      element: <SearchByPartTime />,
    },
    {
      path: "/searchByFullTime",
      element: <SearchByFullTime />,
    },
  ]);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
