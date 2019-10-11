import React, { useState, useMemo, useEffect } from 'react'

import api from '../../services/api'
import AreSureMessage from "../../components/AreSureMessage"

import camera from '../../assets/camera.svg'

import './styles.css'

export default function New(props) {
    const [thumbnail, setThumbnail] = useState(null)
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
	const [price, setPrice] = useState('')
	const [isClick, setClick] = useState(false)

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
	}, [thumbnail])

	useEffect(() => {
		props.forceForce()
	}, [])

    async function handleSubmit(event) {
        event.preventDefault()

        const data = new FormData()
        const user_token = localStorage.getItem('auth-token')

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        await api.post('/spots', data, {
            headers: { 'auth-token': user_token }
        })

        props.history.push('/dashboard')
	}

    return (
		<>
			<form onSubmit={handleSubmit}>
				<label
					id="thumbnail"
					style={{backgroundImage: `url(${preview})`}}
					className={thumbnail ? 'has-thumbnail' : ''}
				>
					<input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
					<img src={camera} alt="Selecione imagem" />
				</label>

				<label htmlFor="company">EMPRESA *</label>
				<input
					id="company"
					placeholder="Sua empresa incrível"
					value={company}
					onChange={event => setCompany(event.target.value)}
				/>

				<label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
				<input
					id="techs"
					placeholder="Quais tecnologias usam?"
					value={techs}
					onChange={event => setTechs(event.target.value)}
				/>

				<label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
				<input
					id="price"
					placeholder="Valor cobrado por dia"
					value={price}
					onChange={event => setPrice(event.target.value)}
				/>

				<button className="btn">Cadastrar</button>
			</form>

			<button onClick={() => setClick(true)} className="btnCancel">Cancelar</button>
			{isClick ? <AreSureMessage /> : null}
		</>
    )
}