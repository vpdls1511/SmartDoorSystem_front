import {useState} from 'react';
import styled from 'styled-components';
import onFetchService from '../../utils/onFetchService';

const ModalBody = styled.div<{ modal: boolean }>`
  display: ${props => props.modal ? 'block' : 'none'};
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0, .5);
`

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20rem;
  background-color: white;
  border-radius: 1rem;
  padding: 1rem;
`

const Input = styled.input`
  width: 100%;
  padding: .2rem;
  border-radius: .2rem;
  border: 1px solid #747474;
  stroke: none;
`

const Title = styled.p`
  font-size: .7rem;
  margin-bottom: .5rem;
`

const ButtonWrap = styled.div`
  display: flex;
  padding: 1rem 0 0;
  gap: .2rem;
`

const Button = styled.button<{ submit?: boolean, del?: boolean }>`
  flex: 1;
  background-color: ${props => props.submit ? '#0dcaf0' : props.del ? '#dc3545' : '#FFFFFF'};
  border: ${props => props.submit || props.del ? 'none' : '1px solid #aaa'};
  color: ${props => props.submit || props.del ? '#FFFFFF' : '#333'};
  padding: .3rem;
  border-radius: .3rem;
  cursor: pointer;
`

const EditModal = ({status, setStatus, editInfo,
	editText,editSubmit,
	                   setEditInfo, createSubmit, delSubmit}: any) => {

	const handleUpdateInfo = (key: string, value: string) => {
		setEditInfo({
			...editInfo,
			[key]: value
		})
	}

	return <ModalBody
		modal={status}
		onClick={(e) => {
			setStatus(!status)
			e.stopPropagation()
		}}
	>
		<ModalContent onClick={e => e.stopPropagation()}>
			<div>
				<Title>호실 번호</Title>
				<Input
					value={editInfo.room_no}
					onChange={e => handleUpdateInfo('room_no', e.target.value)}
				/>
				<Title>크기</Title>
				<Input
					value={editInfo.room_size}
					onChange={e => handleUpdateInfo('room_size', e.target.value)}
				/>
				<Title>허용밀도(명 / m^2)</Title>
				<Input
					value={editInfo.max_user}
					onChange={e => handleUpdateInfo('max_user', e.target.value)}
				/>
				<Title>담당교수</Title>
				<Input
					value={editInfo.professor_name}
					onChange={e => handleUpdateInfo('professor_name', e.target.value)}
				/>
				<ButtonWrap>
					<Button onClick={(e) => {
						setStatus(false)
						e.stopPropagation()
					}}>취소</Button>
					<Button submit onClick={(e) => {
						editSubmit ? editSubmit() : createSubmit()
						e.stopPropagation()
					}}>{editText ? editText : '수정'}</Button>
					{
						delSubmit && <Button del onClick={(e) => {
							delSubmit()
							e.stopPropagation()
						}}>삭제</Button>
					}
				</ButtonWrap>
			</div>
		</ModalContent>
	</ModalBody>
}

export default EditModal
