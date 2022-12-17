import { Route, Routes } from "react-router";
import Login from "./login/login";
import Home from './home/home';
import User from './user/user';

const Router = () => {
     return (
          <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               <Route path='/user' element={<User />} />
               <Route path="*" element={<h1>404: Not Found</h1>} />
          </Routes>
     )

}
export default Router;