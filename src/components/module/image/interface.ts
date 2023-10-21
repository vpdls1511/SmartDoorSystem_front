export type ImageModulePropsType =
	ImageModuleInterface & ImageModuleStyleInterface

export interface ImageModuleInterface {
	src : string
	sizeType?: 'square' | 'rectangle'
	customSize?: boolean
	size?: 'sm' | 'md' | 'lg'
}

export interface ImageModuleStyleInterface {
	sizeWidth?: string
	sizeHeight?: string
}
