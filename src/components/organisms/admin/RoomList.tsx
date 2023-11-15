import React from "react";

interface RoomPropsInterface {
	list: any
}

const RoomList: React.FC<RoomPropsInterface> = ({list}) => {
	return <>
		{
			list.room.length > 0 && list.room.map((it: any, idx: number) => {
				return <div key={idx}>
					{list.buildName} | {it.roomNo} | {it.professorName} | {it.size}m^2 | 허용밀도 - ({it.users} / m^2)
				</div>
			})
		}
	</>
}

export default RoomList
