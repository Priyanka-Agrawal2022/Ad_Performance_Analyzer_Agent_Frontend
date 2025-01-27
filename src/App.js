import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Analyze from "./pages/Analyze";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { path: "", element: <Dashboard /> },
    { path: "upload", element: <Upload /> },
    { path: "analyze", element: <Analyze /> },
  ]);
  return (
    <>
      <RouterProvider router={router}>
        <Dashboard />
      </RouterProvider>
    </>
  );
}

export default App;
