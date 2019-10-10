import React, { useState } from 'react'
import { useAlert } from 'react-alert'

import api from '../../services/api'

export default function Login({ history }) {
	const alert = useAlert()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

		const response = await api.post('/sessions', { email, password })
		if(response.data.output && response.data.output.payload.statusCode) {
			alert.show(`${response.data.output.payload.message}`)
			return history.push('/')
		}

		const token = response.headers['auth-token']
		const { _id } = response.data

        localStorage.setItem('auth-token', token)
        localStorage.setItem('user', _id)

        history.push('/dashboard')
    }

    return (
        <>
            <p>
                Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Seu melhor e-mail!"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

				<label htmlFor="password">SENHA *</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Sua senha secreta"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button className="btn" type="submit">
                    Entrar
                </button>
            </form>
        </>
    )
}