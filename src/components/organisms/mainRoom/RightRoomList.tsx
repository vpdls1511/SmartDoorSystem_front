import {useRecoilValue} from 'recoil';
import {roomAtom} from '../../../store/atom/roomAtom';
import styled from 'styled-components';
import Image from  '../../module/image'
import {useEffect, useState} from 'react';
import onFetchService from '../../../utils/onFetchService';

const RoomItemBody = styled.div`
	display: flex;
	flex-direction: column;
	gap: .5rem;
	margin: 1rem;
	>img{
		margin: 0 auto;
	}
`

const RoomItem = styled.div`
	display: flex;
	padding: .5rem;
	border-radius: .5rem;
	border: 1px solid #afafaf;
`

const RightRoomList = () => {
	const room = useRecoilValue(roomAtom)
	const [item, setItem] = useState<any>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const fetch = () => {
		const id = room.item
		onFetchService({
			url: 'room/detail?id=' + id,
			method: 'get'
		}).then((res: any) => {
			setIsLoading(true)
			setItem(res.payload)
		})
	}

	useEffect(() => {
		fetch()
		if(isLoading){
			setIsLoading(false)
		}
	}, [room])

	useEffect(() => {
		if (isLoading){
			const interval = setInterval(() => fetch(), 1000)
			return () => clearInterval(interval)
		}
	}, [isLoading])

	return room.isSelect ?
		<RoomItemBody>
			{
				room.image && <Image src={'http://202.31.253.176:8001/'+room.image}/>
			}
			{
				item.map((it: any, key: number) => {
					return <RoomItem key={key}> {it.room_no}호 / 최대수용인원 : {it.room_size * it.max_user} / 방 크기 : {it.room_size} / 담당교수  : {it.professor_name} / 현재인원 : {it.now_user}
					</RoomItem>
				})
			}
		</RoomItemBody>
		: null
}

export default RightRoomList
