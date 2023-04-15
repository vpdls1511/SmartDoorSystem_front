import React from "react";
import styled from "styled-components";

interface ModalButtonEvent {
	accept?: any;
	reject?: any;
	multiple: boolean;
}

interface ModalInterface extends ModalButtonEvent{
	isVisible: boolean;
	title: string;
	children: any;
	primary?: string;
	multiple: boolean;
}

const ModalWarp = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .2);
;
`

const ModalBody = styled.div`
	position: absolute;
  left: 50%;
  top: 50%;
	transform: translateX(-50%) translateY(-50%);
  display: inline-block;
  max-width: 300px;
  min-width: 200px;
  border-radius: 10px;
  background-color: white;
  padding: 10px;
`

const ModalTitle = styled.p`
  font-weight: bold;
  text-align: center;
`
const ModalDesc = styled.p`
  padding: 5px;
  width: 100%;
  word-break: break-all;
`
const ModalButtonWrap = styled.div`
	display: flex;
  width: 100%;
`

const ModalButton = styled.button`
	flex:1;
	border: none;
	margin: 5px;
	border-radius: 5px;
	font-size: 12pt;
	padding: 2px;
	font-weight: normal;
	background-color: ${props => props.color};
	color: white;
`

const AlertModal: React.FC<ModalInterface> =
	({
		 isVisible,
		 title,
		 children,
		 primary,
		 multiple,
		 accept,
		 reject
	 }) => {

		if (!isVisible) return null


		return <ModalWarp>
			<ModalBody>
				<ModalTitle>
					{title}
				</ModalTitle>
				<ModalDesc>
					{children}
				</ModalDesc>
				<ModalButtonWrap >
					<AlertModalButton multiple={multiple}/>
				</ModalButtonWrap >
			</ModalBody>
		</ModalWarp>
}

const AlertModalButton: React.FC<ModalButtonEvent> = ({multiple, accept, reject}) => {

	return<>
		<ModalButton color={"#0093E9"}>등록</ModalButton>
		{multiple ? <ModalButton color={"#0093E9"}>취소</ModalButton>: null}
	</>
}


export default AlertModal
