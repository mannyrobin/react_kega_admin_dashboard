import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import TableList from 'views/TableList/TableList';
import Typography from 'views/Typography/Typography';
import Icons from 'views/Icons/Icons';
import Maps from 'views/Maps/Maps';
import Notifications from 'views/Notifications/Notifications';
import Upgrade from 'views/Upgrade/Upgrade';

const appRoutes = [
    { path: "/dashboard", name: "Рабочий стол", icon: "fa fa-dashboard", component: Dashboard },
    { path: "/add-action", name: "Добавить акцию", icon: "pe-7s-plus", component: UserProfile },
    { path: "/your-actions", name: "Ваши акции", icon: "pe-7s-note2", component: TableList },
    { path: "/goods-requests", name: "Заявки на товары", icon: "pe-7s-news-paper", component: Typography },
    { path: "/req-stats", name: "Статистика запросв", icon: "pe-7s-news-paper", component: Typography },
    { path: "/corp-profile", name: "Профиль компании", icon: "pe-7s-news-paper", component: UserProfile },
    { path: "/contact", name: "Связь с разработчиками", icon: "pe-7s-news-paper", component: UserProfile },
    { path: "/logout", name: "Выход", icon: "pe-7s-power", component: UserProfile },
    { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
    { redirect: true, path:"/", to:"/dashboard", name: "Dashboard" }
];

export default appRoutes;
