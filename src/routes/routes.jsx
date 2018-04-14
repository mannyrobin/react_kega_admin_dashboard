import Orders from 'views/Orders/Orders';
import Contact from 'views/Contact/Contact';
import ProductCat from 'views/productCat/ProductCat';
import AllProducts from 'views/AllProducts/AllProducts';
import AddProduct from 'views/AddProduct/AddProduct';
import CorpProfile from "../views/CorpProfile/CorpProfile";

const appRoutes = [
    { path: "/orders", name: "Заказы", icon: "orders", component: Orders },
    { path: "/menu", name: "Меню и товары", dropDown: true, openDropDown: true, icon: "pe-7s-plus"},
    { path: "/add_product", child: true, name: "Добавить товар", component: AddProduct },
    { path: "/all_products", child: true, name: "Все товары", component: AllProducts },
    { path: "/category", child: true, name: "Категории товаров", component: ProductCat },
    { path: "/corp-profile", name: "Профиль компании", icon: "pe-7s-config", component: CorpProfile },
    { path: "/contact", name: "Связь с разработчиками", icon: "pe-7s-mail", component: Contact },
    { redirect: true, path:"/", to:"/orders", name: "Orders" }
];

export default appRoutes;