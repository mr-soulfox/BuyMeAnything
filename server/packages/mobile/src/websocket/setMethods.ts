import {WebSocketServer} from 'ws'

export function setMethods(socket: WebSocketServer) {
	socket.on('connection', (ws) => {
		ws.send('HI From WebSocket Server on @buy-me-anything/mobile package')
	})
}
