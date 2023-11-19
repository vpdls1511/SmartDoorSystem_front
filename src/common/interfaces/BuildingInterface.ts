export interface BuildingInterface {
	floor: string,
	id: string,
	name: string,
	room: RoomInterface[]
	updated_at: string,
	created_at: string,
}

export interface RoomInterface {
	id: number
	build: number
	max_user: number
	professor_name: string
	room_no: number
	room_size: number
}
