import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import {router} from './routes'
import {WebSocket} from './websocket'

dotenv.config()
const app = express()
const port = process.env.PORT || 3006

app.use(express.json())
app.use(cors({origin: process.env.CORS_ORIGIN || '*'}))
app.use(helmet())
app.use(router)

const serverHTTP = app.listen(port, () => {
	console.log(`🚀 @buy-me-anything/mobile websocket listen on http://localhost:${port}`)
})
new WebSocket(serverHTTP)
