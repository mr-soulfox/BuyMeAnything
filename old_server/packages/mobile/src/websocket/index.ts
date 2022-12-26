import {Server} from 'http'
import {Server as WebSocketServer} from 'ws'
import {setMethods} from './setMethods'

export class WebSocket {
	private readonly socket: WebSocketServer

	constructor(serverOpt: Server) {
		this.socket = new WebSocketServer({
			server: serverOpt,
			clientTracking: true,
		})

		console.log(
			`🚀 @buy-me-anything/mobile Websocket s server is running on http://localhost:${
				process.env.PORT || 3006
			}`
		)

		setMethods(this.socket)
	}
}
