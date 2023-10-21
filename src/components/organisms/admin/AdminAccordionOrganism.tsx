import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import onFetchService from '../../../utils/onFetchService';
import {BuildingInterface} from '../../../common/interfaces/BuildingInterface';
import AdminAccordion from '../accordion/AdminAccordion';

interface AdminAccordionOrganismInterface {
	isLoading: boolean
	setLoading: any
}

const AccordionWrap = styled.div`
	flex: 3;
	padding: 10px;
`

const AdminAccordionOrganism: React.FC<AdminAccordionOrganismInterface> = ({isLoading, setLoading}) => {

	const [building, setBuilding] = useState<BuildingInterface[]>([])

	useEffect(() => {
		onFetchService({
			url: 'admin/draw',
			method: 'get'
		}).then((res: any) => {
			setBuilding(res.payload)
		})
	}, [])

	return<AccordionWrap>
		{
			building.length > 0 && building.map((it, index) => <AdminAccordion key={index} item={it} />)
		}
	</AccordionWrap>
}

export default AdminAccordionOrganism
