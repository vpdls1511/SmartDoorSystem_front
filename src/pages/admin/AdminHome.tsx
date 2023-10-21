import React, {useState} from 'react';
import styled from "styled-components";
import AdminAddOrganism from "../../components/organisms/admin/AdminAddOrganism";
import AdminAccordionOrganism from "../../components/organisms/admin/AdminAccordionOrganism";

const AdminHomeWrap = styled.div`
	display: flex;
	width: 100vw;
	height: 100vh;
`

const AdminHome: React.FC = () => {

	const [isLoading, setLoading] = useState(false)

	return<AdminHomeWrap>
		<AdminAddOrganism />
		<AdminAccordionOrganism isLoading={isLoading} setLoading={setLoading}/>
	</AdminHomeWrap>
}

export default AdminHome
