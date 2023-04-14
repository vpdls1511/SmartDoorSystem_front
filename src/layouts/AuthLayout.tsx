import React from "react";
import {Outlet} from "react-router-dom";
import styled from "styled-components";
import AlertModal from "../components/modal/AlertModal";

const AuthWrap = styled.div`
	width: 100vw;
	height: 100vh;
  background-color: #0093E9;
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
`

const AuthBox = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translateX(-50%) translateY(-50%);
	display: inline-block;
	background-color: white;
	padding: 20px 50px;
	border-radius: 20px;
`

const AuthLayout: React.FC = () => {
	return<AuthWrap>
		<AuthBox>
			<Outlet/>
		</AuthBox>
		<AlertModal
			isVisible={true}
			title={'Modal'}
			multiple={false}
		>
			asdfasdfasfasdf
		</AlertModal>
	</AuthWrap>
}

export default AuthLayout
