import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";

import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AllProducts from "./pages/Admin/AllProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import ActivateUser from "./components/Routes/ActivateUser";
import ResetPassword from "./pages/Auth/ResetPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} >
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="product/:slug" element={<UpdateProduct />} />
            <Route path="products" element={<AllProducts />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<AdminOrders />} />
          </Route>
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password/:token" element={<ResetPassword />} />
        <Route path="/user/activate/:token" element={<ActivateUser />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />

        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
