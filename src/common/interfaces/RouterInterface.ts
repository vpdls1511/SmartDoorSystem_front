export interface DefaultRouterInterface {
	path: string;
	element: JSX.Element
}

export interface LayoutRouterInterface extends DefaultRouterInterface {
	children: DefaultRouterInterface[]
}
