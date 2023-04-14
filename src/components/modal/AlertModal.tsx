import React from "react";
import styled from "styled-components";

interface ModalButtonEvent {
	accept?: any;
	reject?: any;
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
`

const ModalBody = styled.div`
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
const ModalButton = styled.div`
  width: 100%;
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
				<ModalButton>
					<button> 등록</button>
					<button> 취소</button>
				</ModalButton>
			</ModalBody>
		</ModalWarp>
}

const AlertModalButton: React.FC<ModalButtonEvent> = ({accept, reject}) => {
	return<>
	</>
}


export default AlertModal
