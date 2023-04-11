import React from "react";
import styled from "styled-components";

const SelectWrap = styled.div`
	position: relative;
	width: 25rem;
	height: 15rem;
	padding: 1rem;
	background-color: rgba(0,0,0,.1);
	margin: 3rem;
`
const RoomInfoWrap = styled.div`
	p:first-child {
		font-size: 1.5rem;
		font-weight: bold;
	}
`

const RoomProfessor = styled.div`
	position: absolute;
	bottom: 1rem;
	left: 1rem;
`

const ProfessorBtn = styled.button`
	padding: .2rem .5rem;
	cursor: pointer;
	transition: .5s;
	border: 1px solid #777;
	color: #777;
	&:hover{
    border: 1px solid #000;
    color: #000;
	}
`

const RoomStatus = styled.div`
	position: absolute;
	right: 1rem;
	bottom: 1rem;
	p{
		font-size: 5rem;
	}
`

const RoomSelect: React.FC = () => {
	return<SelectWrap>
		<RoomInfoWrap>
			<p> 공학1관 | 324호 </p>
			<p> 강의실 </p>
		</RoomInfoWrap>
		<RoomProfessor>
			<ProfessorBtn>교수님</ProfessorBtn>
		</RoomProfessor>
		<RoomStatus>
			<p> 50명 </p>
		</RoomStatus>
	</SelectWrap>
}

export default RoomSelect
