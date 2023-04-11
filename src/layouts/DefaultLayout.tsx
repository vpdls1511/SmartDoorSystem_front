import React from "react";
import {Outlet} from "react-router-dom";

const DefaultLayout: React.FC = () => {
	return<>
		DefaultLayout
		<br/>
		<Outlet />
	</>
}

export default DefaultLayout
