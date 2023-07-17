import './main.css'
import { Route, Routes } from "react-router-dom";
import Layout from './layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        {/* <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user-profile" element={<UserProfile />} /> */}
      </Route>
    </Routes>
  );
}

export default App
