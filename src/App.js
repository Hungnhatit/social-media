import React from "react";
import { Navigate, Outlet, Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";
import { useSelector } from "react-redux";

//Hàm này dùng để kiểm tra người dùng đã đăng nhập hay chưa
function Layout() {
  //  Biến này hiện được đặt là null, giả sử người dùng chưa đăng nhập. Nếu người dùng đã đăng nhập, biến này sẽ chứa thông tin người dùng, bao gồm token xác thực.
  const { user } = useSelector(state => state.user);
  console.log(user);
  const location = useLocation(); //Lấy thông tin về địa điểm hiện tại của người dùng

  // Nếu người dùng đã đăng nhập (có token), trả về Outlet để render các route con
  // Ngược lại điều hướng người dùng đến trang đăng nhập
  return user?.token ? (
    <Outlet />
  ) : (<Navigate to="/login" state={{ from: location }} replace />);
}

function App() {
  const { theme } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user)
  return (
    <>
      <div data-theme={theme} className='w-full min-h-[100vh]'>
        <Routes>
          <Route element={<Layout />}>
            {/* Chỉ khi user đã đăng nhập thì mới truy cập được các route bên dưới */}
            <Route path='/' element={<Home />}></Route>
            <Route path='/profile/:id?' element={<Profile />}></Route>
          </Route>

          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/reset-password' element={<ResetPassword />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
