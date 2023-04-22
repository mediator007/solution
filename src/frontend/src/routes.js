import Admin from "./pages/Admin"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Reports from "./pages/Reports"
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, REPORTS_ROUTE } from "./utils/consts"


export const authAdmin = [
    {
        path: ADMIN_ROUTE,
        component: Admin
    },
]

export const authUser = [
    {
        path: MAIN_ROUTE,
        component: Main
    },
    {
        path: REPORTS_ROUTE,
        component: Reports
    }
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        component: Login
    }
]