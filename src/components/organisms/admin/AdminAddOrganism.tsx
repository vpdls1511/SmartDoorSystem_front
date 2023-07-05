import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import DragDrop from "../../../utils/DragDrop";
import RoomList from "./RoomList";

const InputWrap = styled.div`
  flex: 2;
  width: 200px;
  padding: 5rem;
  border-right: 1px solid #777;
`

const InfoInputWrap = styled.div`
  width: 100%;
`

const InputText = styled.input`
  width: 100%;
`

const Button = styled.button`
  display: inline-block;
  width: 100%;`

const AdminAddOrganism: React.FC = () => {

	const contentRef = useRef<any>([])
	const roomRef: any = useRef(null)
	const noRef: any = useRef(null)
	const professorRef: any = useRef(null)
	const stdRef: any = useRef(null)

	const [contents, setContents] = useState({
		buildName: '공학1관',
		floor: '3',
		room : [{
			roomNo: '323',
			professorName: '최은복',
			size: '25',
			users: '10'
		}]
	})

	const onAddContent = useCallback(() => {
		const temp = contentRef.current

		for (const it of temp) {
			if (it.value.isEmpty || !it.value) {
				alert("비어있는 필드가 존재합니다.")
				return
			}
		}

		const result = {
			roomNo: temp[2].value,
			professorName: temp[3].value,
			size: temp[4].value,
			users: temp[5].value
		}

		setContents({
			buildName: temp[0].value,
			floor: temp[1].value,
			room: [
				...contents.room,
				result
			]
		})
	}, [contents])

	const onSubmitData = () => {
		const result = JSON.stringify(contents);
		console.log(result)
	}

	return <>
		<InputWrap>
			<InfoInputWrap>
				<DragDrop/>
				<br/>
				<InputText ref={(el) => contentRef.current[0] = el} type={'text'} placeholder={'건물 이름'}/>
				<InputText ref={(el) => contentRef.current[1] = el} type={'text'} placeholder={'층'}/>

				<br/><br/>
				<InputText ref={(el) => contentRef.current[2] = el} type={'text'} placeholder={'호수'}/>
				<InputText ref={(el) => contentRef.current[3] = el} type={'text'} placeholder={'담당자'}/>
				<InputText ref={(el) => contentRef.current[4] = el} type={'text'} placeholder={'크기'}/>
				<InputText ref={(el) => contentRef.current[5] = el} type={'text'} placeholder={'최대수용인원'}/>
				<br/><br/>
				<Button onClick={onAddContent}> 추가하기 </Button>
				<br/>
				<br/>
				<RoomList list={contents}/>
			</InfoInputWrap>
			<br/>
			<Button onClick={onSubmitData}> 등록하기 </Button>
		</InputWrap>
	</>
}

export default AdminAddOrganism
