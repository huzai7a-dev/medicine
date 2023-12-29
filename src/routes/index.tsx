import { RouteObject } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/Home";
import InnerLayout from "../components/InnerLayout";
import SearchBy from "../pages/SearchBy";
import SearchPrescription from "../pages/SearchPrescription";
import LoginForm from "../components/LoginForm";
import Signup from "../pages/Signup";
import Pharmacist from "../pages/Pharmacist";

const getRoutes = (isLoggedIn: boolean): RouteObject[] => {
  return [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "search-by",
          element: (
            <InnerLayout aside={"searchBy"}>
              {isLoggedIn ? (
                <SearchBy />
              ) : (
                <LoginForm isOpen={true} onClose={() => {}} />
              )}
            </InnerLayout>
          ),
        },
        {
          path: "search-prescription",
          element: (
            <InnerLayout aside={"prescription"}>
              {isLoggedIn ? (
                <SearchPrescription />
              ) : (
                <LoginForm isOpen={true} onClose={() => {}} />
              )}
            </InnerLayout>
          ),
        },
        {
          path: "pharmacist",
          element: (
            <>
              {isLoggedIn ? (
                <Pharmacist />
              ) : (
                <LoginForm isOpen={true} onClose={() => {}} />
              )}
            </>
          ),
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ];
};

export default getRoutes;
