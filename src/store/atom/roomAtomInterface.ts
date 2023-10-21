export interface RoomAtomInterface {
	isSelect: boolean
	item?: RoomInterface[]
	image?: string
}

export interface RoomInterface {
	build: number
	room_no: number
	max_user: number
	room_size: number
	professor_name: string
}
