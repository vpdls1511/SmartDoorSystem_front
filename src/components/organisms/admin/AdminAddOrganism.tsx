import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import DragDrop from "../../../utils/DragDrop";

const InputWrap = styled.div`
  flex: 1;
  width: 200px;
  padding: 5rem;
  border-right: 1px solid #777;
`

const InfoInputWrap = styled.div`
  width: 100%;
  button {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const Button = styled.button`
  margin-top: 50px;
  width: 100%;
  height: 50px;
`

const AdminAddOrganism: React.FC = () => {

	const buildRef = useRef(null)
	const roomRef = useRef(null)
	const professorRef = useRef(null)

	const [contents, setContents] = useState([
		{
			id: 0,
			buildName: '공학1관',
			roomNo: '323',
			professorName: '최은복',
		},
		{
			id: 0,
			buildName: '공학1관',
			roomNo: '323',
			professorName: '최은복',
		},
		{
			id: 0,
			buildName: '공학1관',
			roomNo: '323',
			professorName: '최은복',
		},
	])

	useEffect(() => {

	}, [buildRef, roomRef, professorRef])

	return <>
		<InputWrap>
			<InfoInputWrap>
				<DragDrop/>
				<div> {
					contents.map((it, idx) => {
						return <div> {it.buildName} | {it.roomNo} | {it.professorName} </div>
					})
				} </div>
				<button> +</button>
			</InfoInputWrap>

			<Button> 등록하기 </Button>
		</InputWrap>
	</>
}

export default AdminAddOrganism
