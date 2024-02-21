import React, {useEffect, useRef, useState} from 'react';
import {BuildingInterface} from '../../../common/interfaces/BuildingInterface';
import styled from 'styled-components';
import Arrow from '../../icon/arrow';
import EditModal from '../../modal/EditModal';
import onFetchService from '../../../utils/onFetchService';
import BuildEditModal from "../../modal/BuildEditModal";

const AccordionBody = styled.div`
	border: 1px solid #aaa;
	margin-bottom: 10px;
	padding: 5px;
	border-radius: 5px;
	overflow: hidden;
	p {
		display: inline-block;
	}
  transition: .5s;
`

const AccordionArrow = styled.div`
	width: 15px;
	height: 10px;
	float: right;
  transition: .5s;
	&.active{
    transform: translateY(8px) rotate(90deg);
	}
`

const Contents = styled.div`
`

const AdminAccordion: React.FC<{ item: BuildingInterface }> = ({item}) => {
	const contentRef = useRef<any>(null)
	const [isOpen, setOpen] = useState<boolean>(false)
	const [height, setHeight] = useState<number>(40)
	const [editInfo, setEditInfo] = useState({
		build: item.id,
		room_no: '',
		room_size: '',
		max_user: '',
		professor_name: '',
	})
	const [isModal, setIsModal] = useState(false)
	const [isEditModal, setIsEditModal] = useState(false)

	const createSubmit = () => {
		onFetchService({
			url: 'admin/build',
			method: 'post',
			data: editInfo
		}).then((res: any) => {
			window.location.reload()
		})
	}
	const editSubmit = (build: any) => {
		onFetchService({
			url: 'admin/build',
			method: 'put',
			data: build
		}).then((res: any) => {
			window.location.reload()
		})
	}

	const delSubmit = () => {
		onFetchService({
			url: 'admin/build',
			method: 'delete',
			data: {id: item.id}
		}).then(res => {
			window.location.reload()
		})
	}

	useEffect(() => {
		if(contentRef){
			const height = contentRef.current.clientHeight
			setHeight(40 + height)
		}
	}, [isOpen])

	return<AccordionBody
		onClick={() => setOpen(!isOpen)}
		style={{
			height: height.toString() + 'px'
		}}
	>
		<p> {item.name} / {item.floor}층 </p>
		<AccordionArrow className={isOpen ? 'active' : ''}>
			<Arrow />
		</AccordionArrow>
		<Contents ref={contentRef}>

			<button onClick={(e) => {
				setIsEditModal(true)
				e.stopPropagation()
			}}> 건물 수정 </button>
			<button onClick={(e) => {
				setIsModal(true)
				e.stopPropagation()
			}}> 방 추가 </button>
			{
				isOpen && <>
					{item.room.map( (it, key) => {
						return<div key={key}>
							<Item item={it}/>
						</div>
					})}
				</>
			}
			<EditModal
				status={isModal}
				setStatus={setIsModal}
				editInfo={editInfo}
				setEditInfo={setEditInfo}
				editText={'추가'}
				createSubmit={createSubmit}
			/>

			<BuildEditModal
				status={isEditModal}
				setStatus={setIsEditModal}
				item={item}
				editText={'수정'}
				editSubmit={editSubmit}
				delSubmit={delSubmit}
			/>
		</Contents>
	</AccordionBody>
}

const Item = ({item}: any) => {

	const [info, setInfo] = useState(item)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [isModal, setIsModal] = useState(false)
	const [editInfo, setEditInfo] = useState(item)


	const createSubmit = () => {
		onFetchService({
			url: 'admin/room',
			method: 'post',
			data: editInfo
		}).then((res: any) => {
			window.location.reload()
		})
	}

	const delSubmit = () => {
		onFetchService({
			url: 'admin/room',
			method: 'delete',
			data: {id: editInfo.id}
		}).then(res => {
			window.location.reload()
		})
	}

	return <>
    <>
			{info.room_no}호 / 최대수용인원 : {info.room_size * info.max_user} / 방 크기 : {info.room_size} / 담당교수 : {info.professor_name}
    </>
    <button onClick={(e) => {
			setIsEdit(true)
	    setIsModal(true)
			e.stopPropagation()
		}}> 방 수정 </button>
		<EditModal status={isModal}
		           editInfo={editInfo}
		           setEditInfo={setEditInfo}
		           setStatus={setIsModal}
		           createSubmit={createSubmit}
		           delSubmit={delSubmit}
		/>
  </>
}

export default AdminAccordion
