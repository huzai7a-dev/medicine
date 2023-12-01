import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import SearchBy from "./pages/SearchBy"
import SearchPrescription from "./pages/SearchPrescription"


const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/search-by',
        element:<SearchBy/>
      },
      {
        path:'/search-prescription',
        element:<SearchPrescription/>
      },
    ]
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  )
}

export default App
