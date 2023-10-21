import styled from 'styled-components';
import {ImageModuleStyleInterface} from './interface';

export const ImageStyle = styled.img<ImageModuleStyleInterface>`
	width: ${p => p.sizeWidth};
	height: ${p => p.sizeHeight};
`
