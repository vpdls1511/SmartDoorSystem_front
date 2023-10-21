import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import MainRoom from './mainRoom/index'
import onFetchService from '../../utils/onFetchService';
import {RoomInterface} from '../../store/atom/roomAtomInterface';
import {useRecoilState} from 'recoil';
import {roomAtom} from '../../store/atom/roomAtom';
import RightRoomList from './mainRoom/RightRoomList';

export interface BuildInterface {
	id: number,
	name: string,
	floor: number,
	created_at: string,
	updated_at: string,
	room: RoomInterface[],
	path?: string
}

const SelectWrap = styled.div`
	display: flex;
	flex-direction: row;
`

const LeftSide = styled.div`
	display: flex;
	flex-direction: column;
	flex:1;
	gap: 1rem;
  padding: 1rem;
`

const RightSide = styled.div<{open: number}>`
	display: flex;
  flex-direction: column;
  flex: ${p => p.open};
	transition: .5s;
	overflow: hidden;
	> * {
    display: ${p => p.open !== 0 ? 'block' : 'none'};
	}
	> p {
		cursor: pointer;
		font-size: 2rem;
	}
`
/*
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
*/
const RoomSelect: React.FC = () => {

	const [room, setRoom] = useRecoilState(roomAtom)
	const [building, setBuilding] = useState<BuildInterface[]>([])

	const handleCloseRightSide = () => {
		setRoom({
			isSelect: false,
			item: []
		})
	}

	useEffect(() => {
		onFetchService({
			url: 'room',
			method: 'get'
		}).then((res: any) => {
			setBuilding(res.payload)
		})
	}, [])

	return<SelectWrap>
		<LeftSide>
			{
				building.map((it, key) => {
					return <MainRoom key={key} item={it} />
				})
			}
		</LeftSide>
		<RightSide open={room.isSelect ? 2 : 0}>
			<p onClick={handleCloseRightSide}> x </p>
			<RightRoomList />
		</RightSide>
{/*		<RoomInfoWrap>
			<p> 공학1관 | 324호 </p>
			<p> 강의실 </p>
		</RoomInfoWrap>
		<RoomProfessor>
			<ProfessorBtn>교수님</ProfessorBtn>
		</RoomProfessor>
		<RoomStatus>
			<p> 50명 </p>
		</RoomStatus>*/}
	</SelectWrap>
}

export default RoomSelect
