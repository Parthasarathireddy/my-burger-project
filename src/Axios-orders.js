import axios from 'axios';
const instance  = axios.create({
    baseURL : 'https://react-my-burger-d0ca1.firebaseio.com/'
})
axios.defaults.headers.common['Authentication'] = 'AUTH TOKEN INSTANCE'
export default instance;