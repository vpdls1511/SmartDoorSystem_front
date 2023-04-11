import DefaultLayout from "../../layouts/DefaultLayout";

// Auth
import AuthHome from "../../pages/auth/AuthHome";

// Admin
import AdminHome from "../../pages/admin/AdminHome";

// User
import UserHome from "../../pages/user/UserHome";
import {DefaultRouterInterface, LayoutRouterInterface} from "../../common/interfaces/RouterInterface";

const AuthRouter: DefaultRouterInterface[] = [
	{path : '' , element : <AuthHome />}
]

const AdminRouter: DefaultRouterInterface[] = [
	{path : '' , element : <AdminHome />}
]

const UserRouter: DefaultRouterInterface[] = [
	{path : '' , element : <UserHome />}
]

const LayoutRouter: LayoutRouterInterface[] = [
	{path : '' , element : <DefaultLayout />, children: UserRouter},
	{path : 'admin' , element : <DefaultLayout />, children: AdminRouter},
	{path : 'auth' , element : <DefaultLayout />, children: AuthRouter},
]

export {
	LayoutRouter
}
