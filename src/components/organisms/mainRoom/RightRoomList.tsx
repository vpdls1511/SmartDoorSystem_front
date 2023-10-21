import {useRecoilValue} from 'recoil';
import {roomAtom} from '../../../store/atom/roomAtom';
import styled from 'styled-components';
import Image from  '../../module/image'

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

	return room.isSelect ?
		<RoomItemBody>
			{
				room.image && <Image src={'http://localhost:8001/'+room.image}/>
			}
			{
				room.item?.map((it, key) => {
					return <RoomItem key={key}> {it.room_no}호 / 최대수용인원 : {it.max_user} / 방 크기 : {it.room_size} / 담당교수  : {it.professor_name}
					</RoomItem>
				})
			}
		</RoomItemBody>
		: null
}

export default RightRoomList
