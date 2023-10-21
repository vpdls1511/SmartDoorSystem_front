import {ImageModulePropsType} from './interface';
import {ImageStyle} from './style'
import React, {useEffect, useState} from 'react';

const Index: React.FC<ImageModulePropsType> = (props) => {

	const [size, setSize] = useState({
		width: '1rem',
		height: '1rem'
	})

	useEffect(() => {
		if (!props.customSize) {
			const sizeType = props.size || 'md'
			const size = sizeType === 'sm' ? 10 : sizeType === 'md' ? 15 : 20

			if (props.sizeType === 'rectangle') {
				setSize({width: size + 'rem', height: size + 'rem'})
			} else {
				setSize({width: (size * 2) + 'rem', height: size + 'rem'})
			}

		} else {
			setSize({
				width: props.sizeWidth || '5rem',
				height: props.sizeHeight || '5rem'
			})
		}
	}, [props.size])

	return <>
		<ImageStyle
			src={props.src}
			sizeWidth={size.width}
			sizeHeight={size.height}
		/>
	</>
}

export default Index
