import {io} from 'socket.io-client';
const socket = io.connect('http://92.51.39.155:5000');
export default socket;
