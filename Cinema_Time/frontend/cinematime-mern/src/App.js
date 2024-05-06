import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './HomePage/home';
import Navct from './navbar/nav';
import Aboutpage from './AboutPage/aboutpage';
import { Route, Routes } from 'react-router-dom';
import Login from './LoginPage/login';
import Register from './RegisterPage/register';
function App() {
  return (
    <>

      <Navct />
      {/* <Login /> */}
      {/* <Register /> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes>



    </>
  );
}

export default App;
