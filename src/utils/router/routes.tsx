import React from 'react'
import {RouteObject} from "react-router-dom";
import {LayoutRouter} from "./RouterList";
import {DefaultRouterInterface, LayoutRouterInterface} from "../../common/interfaces/RouterInterface";

const routes = (): RouteObject[] => {
	return LayoutRouter.map( (layout: LayoutRouterInterface) => {
		return {
			path: layout.path,
			element: layout.element,
			children: layout.children.map((page: DefaultRouterInterface) => {
				return {
					path: page.path,
					element: page.element
				}
			})
		}
	})
}

export default routes
