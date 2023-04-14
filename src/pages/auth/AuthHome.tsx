import React, {useState} from "react";
import {BasicAuth} from "../../common/interfaces/AuthInterface";
import styled from "styled-components";

const WrapTitle = styled.p`
  text-align: center;
  font-weight: bold;
  padding: 20px;
  font-size: 2rem;
`

const InputLabel = styled.label`
  font-size: .8rem;
  font-weight: normal;
  color: #777;
  line-height: 35px;
`
const Input = styled.input`
  width: 250px;
  padding: 5px;
  outline: none;
  clear: both;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: lighter;

  &:focus + label {
    font-size: 2rem;
  }
`

const SubmitButton = styled.button`
  width: 250px;
  height: 35px;
  background-color: #0093E9;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  margin: 30px 0;
  font-size: 1rem;
`

const AuthHome: React.FC = () => {
	const [auth, setAuth] = useState<BasicAuth>({
		id: '',
		password: '',
	})

	const onLoginSubmit = () => {

	}

	return <>
		<WrapTitle>Login</WrapTitle>
		<span>
			<InputLabel> ID </InputLabel><br/>
			<Input id={'id'} value={auth.id} type={'text'}
			       placeholder={'abc@gmail.com'}
			       onChange={(e) => setAuth({...auth, id: e.target.value})}/><br/>

		</span>

		<span>
			<InputLabel>PASSWORD</InputLabel><br/>
			<Input id={'password'} value={auth.password} type={'password'}
			       placeholder={'**********'}
			       onChange={(e) => setAuth({...auth, password: e.target.value})}/><br/>
		</span>

		<SubmitButton onClick={onLoginSubmit}>
			로그인
		</SubmitButton>
	</>
}

export default AuthHome
