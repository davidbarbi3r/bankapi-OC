import './main.css'
import { Route, Routes } from "react-router-dom";
import Layout from './layout/Layout';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App
