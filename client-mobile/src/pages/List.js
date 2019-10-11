import React, { useState, useEffect } from 'react'
import socketio from 'socket.io-client'
import { SafeAreaView, Alert, ScrollView, StyleSheet, AsyncStorage, Image } from 'react-native'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List() {
	const [techs, setTechs] = useState([])
	const [token, setToken] = useState('')

	AsyncStorage.getItem('auth-token').then(token => {
		setToken(token)
	})

	useEffect(() => {
		AsyncStorage.getItem('user').then(user_id => {
			const socket = socketio('http://172.17.140.33:3333', {
				query: { user_id }
			})

			socket.on('booking_response', booking => {
				Alert.alert(`Sua reserva em ${booking.spot.company} no dia ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
			})
		})
	}, [])

	useEffect(() => {
		AsyncStorage.getItem('techs').then(strgTechs => {
			const techsArr = strgTechs.split(',').map(tech => tech.trim())

			setTechs(techsArr)
		})
	}, [])

	return (
		<SafeAreaView styles={styles.container}>
			<Image style={styles.logo} source={logo} />

			<ScrollView>
				{techs.map(tech => <SpotList key={tech} tech={tech} token={token} />)}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	logo: {
		height: 32,
		resizeMode: "contain",
		alignSelf: 'center',
		marginTop: 35,
	}
})