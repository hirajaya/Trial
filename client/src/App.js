import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Inquiry from './components/getinquiry/Inquiry';
import Add from './components/addinquiry/Add';

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <Inquiry/>,
    },
    {
      path:"/add",
      element: <Add/>,
    },
    {
      path:"/edit",
      element: "Update Inquiry Page"
    }
  ])

  return (
    <div className="App">
        <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
