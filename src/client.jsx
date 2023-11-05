import io from 'socket.io-client'
// import { feathers } from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import { feathers } from '@feathersjs/client'
// const conn = process.env.REACT_APP_BACKEND;
const conn = 'http://localhost:3030/';

const socket = io(conn)
const client = feathers()

client.configure(socketio(socket,{timeout: 30000} ))
client.configure(feathers.authentication());

export default client;