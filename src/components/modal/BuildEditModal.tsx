import {useEffect, useState} from 'react';
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

const BuildEditModal = ({
                          status, setStatus,item,
                          editText, editSubmit, delSubmit
                        }: any) => {

  const [build, setBuild] = useState({
    id: item.id,
    building_order: item.building_order,
    name: item.name,
    floor: item.floor
  })

  const handleUpdateInfo = (key: string, value: string) => {
    setBuild({
      ...build,
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
        <Title>순서</Title>
        <Input
          value={build.building_order}
          onChange={e => handleUpdateInfo('building_order', e.target.value)}
        />
        <Title>건물 이름</Title>
        <Input
          value={build.name}
          onChange={e => handleUpdateInfo('name', e.target.value)}
        />
        <Title>층</Title>
        <Input
          value={build.floor}
          onChange={e => handleUpdateInfo('floor', e.target.value)}
        />
        <ButtonWrap>
          <Button onClick={(e) => {
            setStatus(false)
            e.stopPropagation()
          }}>취소</Button>
          <Button submit onClick={(e) => {
            editSubmit(build)
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

export default BuildEditModal
