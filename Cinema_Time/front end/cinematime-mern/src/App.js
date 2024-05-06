import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './HomePage/home';
import Navct from './navbar/nav';
import Aboutpage from './AboutPage/aboutpage';
import { Route, Routes } from 'react-router-dom';
import Login from './LoginPage/login';
function App() {
  return (
    <>
      {/* <Navct />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes> */}

      <Login />

    </>
  );
}

export default App;
