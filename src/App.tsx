import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Dashboard />}>
      <Route index element={<Dashboard />} />
      {/* <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} /> */}
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App
