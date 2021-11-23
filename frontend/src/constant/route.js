import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProductsCreate from "../pages/Products/Create";
import ProductsView from "../pages/Products/View";
import Cart from "../pages/Cart";

const userRoutes = [
    { label: "Home", to: "/", isProtected: false, Component: Home },
    { label: "Login", to: "/login", isProtected: false, Component: Login },
    { label: "Register", to: "/signup", isProtected: false, Component: Signup },
];

const adminRoutes = [
    { label: "Home", to: "/", isProtected: false, Component: Home },
    { label: "Create product", to: "/create-product", isProtected: true, role: "admin", Component: ProductsCreate },
    { label: "Create product", to: "/product/:productId", isProtected: true, role: "admin", Component: ProductsView, removeNavBar: true },
];

const commonRoutes = [{ label: "Cart", to: "/cart", Component: Cart }];

export { userRoutes, adminRoutes, commonRoutes };
