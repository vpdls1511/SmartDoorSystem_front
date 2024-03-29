import React, {useCallback, useRef, useState} from "react";
import styled from "styled-components";
import DragDrop from "../../../utils/DragDrop";
import RoomList from "./RoomList";
import onFetchService from '../../../utils/onFetchService';


interface buildAndRoomInterface {
	buildName: string;
	floor: string;
	room : roomType[];
}
type roomType = {
	roomNo?: string;
	professorName?: string;
	size?: string;
	users?: string;
}


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
	const [file, setFile] = useState<any>()

	const [contents, setContents] = useState<buildAndRoomInterface>({
		buildName: '',
		floor: '',
		room: []
	})

	const onAddContent = useCallback(() => {
		const temp = contentRef.current.filter((el: any) => el !== null && el !== undefined);

		for (const it of temp) {
			if (it.value.isEmpty || !it.value) {
				alert("비어있는 필드가 존재합니다.")
				return
			}
		}

		const result: roomType = {
			roomNo: temp[2].value,
			professorName: temp[3].value,
			size: temp[4].value,
			users: temp[5].value
		}

		setContents((prev: buildAndRoomInterface) => ({
				buildName: temp[0].value,
				floor: temp[1].value,
				room: [
					...prev.room,
					result,
				]
			}))

		for(let it in contentRef.current){
			if(parseInt(it) >= 2) {
				contentRef.current[it].value = ''
			}
		}
	}, [] )

	const onSubmitData = () => {
		const formData = new FormData()

		formData.append('data', JSON.stringify(contents))
		formData.append('file', file)

		onFetchService({
			url: 'admin/draw',
			method: 'post',
			data: formData
		}).then((res: any) => {
			setContents({
				buildName: '',
				floor: '',
				room: []
			})
		})
	}

	return <>
		<InputWrap>
			<InfoInputWrap>
				<DragDrop setFile={setFile}/>
				<br/>
				<InputText ref={(el) => contentRef.current[0] = el} type={'text'} placeholder={'건물 이름'}/>
				<InputText ref={(el) => contentRef.current[1] = el} type={'text'} placeholder={'층'}/>

				<br/><br/>
				<InputText ref={(el) => contentRef.current[2] = el} type={'text'} placeholder={'호수'}/>
				<InputText ref={(el) => contentRef.current[3] = el} type={'text'} placeholder={'담당자'}/>
				<InputText ref={(el) => contentRef.current[4] = el} type={'text'} placeholder={'크기'}/>
				<InputText ref={(el) => contentRef.current[5] = el} type={'text'} placeholder={'허용밀도(명 / m^2)'}/>
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
