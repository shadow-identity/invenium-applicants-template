import React, {ChangeEvent, useState, FormEvent} from 'react'
import styles from './Login.module.css'
import {loginRequest} from '../../graphql/requests'
import classNames from 'classnames'

export const Login = ({ onToken }: { onToken: (newToken: string) => void }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState(false)

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault()
		const result = await loginRequest(email, password)
		result ? onToken(result) : setError(true)
	}
	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}
	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}

	const formClassNames = classNames(styles.form, error && styles.form_error)

	return (
		<form onSubmit={handleSubmit} className={formClassNames}>
			<label htmlFor="email">Email</label>
			<input type="email" name="email" id="email" onChange={handleEmailChange} />
			<label htmlFor="password">Password</label>
			<input type="password" name="password" id="password" onChange={handlePasswordChange} />
			<button type="submit">Login</button>
		</form>
	)
}
