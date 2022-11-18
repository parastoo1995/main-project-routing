import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-redux-main-c7741-default-rtdb.firebaseio.com',
})

export default instance
