import { Navigate, Outlet, Routes, Route, useLocation } from "react-router-dom";
import { Home, Login, Profile, Register, ResetPassword } from "./pages";

//Hàm này dùng để kiểm tra người dùng đã đăng nhập hay chưa
function Layout() {
  const user = null;
  const location = useLocation();
  return user?.token ? (
    <Outlet />
  ) : (<Navigate to="/login" state={{ from: location }} replace />);
}

function App() {
  return (
    <>
      <div className='w-full min-h-[100vh]'>
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
