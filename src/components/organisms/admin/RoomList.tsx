import React from "react";

interface RoomPropsInterface {
	list: any
}

const RoomList: React.FC<RoomPropsInterface> = ({list}) => {
	return <>
		{
			list.room.map((it: any, idx: number) => {
				return <div key={idx}>
					{list.buildName} | {it.roomNo} | {it.professorName} | {it.size}m^3 | {it.users}명
				</div>
			})
		}
	</>
}

export default RoomList
