import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './components/HomePage/home';
import Navct from './components/navbar/nav';
import Aboutpage from './components/AboutPage/aboutpage';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/LoginPage/login';
import Register from './components/RegisterPage/register';
import AdminPage from './components/AdminPage/adminpage';
import { useAuth } from './context/AuthContext'; // Assuming your context file is named AuthContext.js
import Profilepg from './components/ProfilePage/profilepage';
import Usersdata from './components/AdminPage/usersdata';
import Itmestable from './components/AdminPage/itmestable';
import AddNewItem from './components/AdminPage/addnewitem';
import Itemspage from './components/Itemspage/itemspage';
import UpdateItem from './components/AdminPage/updateitem';

function App() {
  const { user } = useAuth();


  return (
    <>
      {user && <Navct />}
      <Routes>

        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />

        {user && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/itemspage/:category" element={<Itemspage />} />
            <Route path="/profile/:email" element={<Profilepg />} />
          </>
        )}

        {user && !user.isAdmin && (
          <Route path="/admin/*" element={<Navigate to="/home" />} />
        )}


        {user && user.isAdmin && (
          <Route path="/admin/*" element={<AdminPage />}>
            <Route path="usersdata" element={<Usersdata />} />
            <Route path="itmestable/:category" element={<Itmestable />} />
            <Route path="addnewitem" element={<AddNewItem />} />
            <Route path="updateitem/:itemId" element={<UpdateItem />} />

          </Route>
        )}

        {!user && (
          <Route path="*" element={<Navigate to="/" replace />} />
        )}

      </Routes>
    </>
  );
}

export default App;
