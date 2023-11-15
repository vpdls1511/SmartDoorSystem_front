import styled from 'styled-components';
import {BuildInterface} from '../RoomSelect';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {roomAtom} from '../../../store/atom/roomAtom';

const BuildWrap = styled.div`
	border: 1px solid #c1c1c1;
	border-radius: 1rem;
	padding: 1rem;
	cursor: pointer;
`

const BuildItem = styled.div`
`

interface MainRoomPropsInterface {
	item: BuildInterface
}

const Index = ({item}: MainRoomPropsInterface) => {

	const [room, setRoom] = useRecoilState(roomAtom)

	const handleClickItem = () => {
		setRoom({
			isSelect: true,
			item: item.id,
			image: item.path
		})
	}

	return<BuildWrap onClick={handleClickItem}>
		<p>{item.name} / {item.floor}층 / {item.room.length}개 실</p>
	</BuildWrap>
}

export default Index
