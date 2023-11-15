import React, {useEffect, useRef, useState} from 'react';
import {BuildingInterface} from '../../../common/interfaces/BuildingInterface';
import styled from 'styled-components';
import Arrow from '../../icon/arrow';

const AccordionBody = styled.div`
	border: 1px solid #aaa;
	margin-bottom: 10px;
	padding: 5px;
	border-radius: 5px;
	overflow: hidden;
	p {
		display: inline-block;
	}
  transition: .5s;
`

const AccordionArrow = styled.div`
	width: 15px;
	height: 10px;
	float: right;
  transition: .5s;
	&.active{
    transform: translateY(8px) rotate(90deg);
	}
`

const Contents = styled.div`
`

const AdminAccordion: React.FC<{ item: BuildingInterface }> = ({item}) => {
	const contentRef = useRef<any>(null)
	const [isOpen, setOpen] = useState<boolean>(false)
	const [height, setHeight] = useState<number>(40)

	useEffect(() => {
		if(contentRef){
			const height = contentRef.current.clientHeight
			setHeight(40 + height)
		}
	}, [isOpen])

	return<AccordionBody
		onClick={() => setOpen(!isOpen)}
		style={{
			height: height.toString() + 'px'
		}}
	>
		<p> {item.name} / {item.floor}층 </p>
		<AccordionArrow className={isOpen ? 'active' : ''}>
			<Arrow />
		</AccordionArrow>
		<Contents ref={contentRef}>
			{
				isOpen && <>
					{item.room.map( (it, key) => {
						return<div key={key}>
							{it.room_no}호 / 최대수용인원 : {it.room_size * it.max_user} / 방 크기 : {it.room_size} / 담당교수 : {it.professor_name}
							<br/>
						</div>
					})}
				</>
			}
		</Contents>
	</AccordionBody>

}

export default AdminAccordion
