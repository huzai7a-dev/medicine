import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import SearchBy from "./pages/SearchBy";
import SearchPrescription from "./pages/SearchPrescription";
import InnerLayout from "./components/InnerLayout";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        index: true,
        element: (
          <Home/>
        ),
      },
      {
        path: "search-by",
        element: (
          <InnerLayout aside={"searchBy"}>
            <SearchBy />
          </InnerLayout>
        ),
      },
      {
        path: "search-prescription",
        element: (
          <InnerLayout aside={"prescription"}>
            <SearchPrescription />
          </InnerLayout>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
