import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Portfolio } from './Portfolio';
import { Settings } from './Settings';
import { Login, Register } from './Auth';
import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* <Route path="home" index element={<Dashboard />} > */}
      <Route path="home" element={<Dashboard />} >
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
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
