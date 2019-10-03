import axios from 'axios'

const api = axios.create({
	baseURL: 'http://172.17.140.33:3333',
})

export default api