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

const RightSide = styled.div<{open: boolean}>`
	display: flex;
  flex-direction: column;
  flex: ${p => p.open ? 2 : 0};
	transition: .5s;
	overflow: hidden;
	> * {
    display: ${p => p.open ? 'block' : 'none'};
	}
	> p {
		cursor: pointer;
		font-size: 2rem;
	}
`

const Float = styled.div`
	position: fixed;
	width: 2rem;
	height: 2rem;
	background-color: cornflowerblue;
	border-radius: 2rem;
	bottom: 1rem;
	right: 1rem;
	cursor: pointer;
`

const Arrow = styled.div`
	position: absolute;
	left: calc(50% - .1rem);
	top: 50%;
	transform: translateX(-50%) translateY(-50%) rotate(45deg);
	width: .7rem;
	height: .7rem;
	border-top: 1px solid #fff;
	border-right: 1px solid #fff;
`

const RoomSelect: React.FC = () => {

	const [room, setRoom] = useRecoilState(roomAtom)
	const [building, setBuilding] = useState<BuildInterface[]>([])

	const handleCloseRightSide = () => {
		setRoom({
			isSelect: false,
			item: -1
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
		<RightSide open={room.isSelect}>
			<p onClick={handleCloseRightSide}> x </p>
			<RightRoomList />
		</RightSide>
		<Float onClick={() => window.location.href = '/admin'}>
			<Arrow/>
		</Float>
	</SelectWrap>
}

export default RoomSelect
