import {atom} from 'recoil';
import {RoomAtomInterface} from './roomAtomInterface';

export const roomAtom = atom<RoomAtomInterface>({
	key: 'roomAtom',
	default: {
		isSelect: false,
		item: undefined,
		image: ''
	}
});
