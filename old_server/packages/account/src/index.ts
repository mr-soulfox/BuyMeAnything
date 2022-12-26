import express from 'express'
import cors from 'cors'
import {routes} from './routes'
import dotenv from 'dotenv'
import cluster from 'cluster'
import os from 'os'
import mongoose from 'mongoose'

dotenv.config({path: '../.env'})

const port = process.env.PORT || 3001
const app = express()
const numCpu = os.cpus().length

mongoose.connect(String(process.env.MONGO_DB_URL))

app.use(express.json())
app.use(cors({origin: process.env.CORS_ORIGIN || '*'}))
app.use(routes)

if (cluster.isPrimary) {
	for (let i = 0; i < numCpu; i++) {
		cluster.fork()
	}
	cluster.on('exit', () => {
		cluster.fork()
	})
} else {
	app.listen(port, () => {
		console.log(
			`🚀 @buy-me-anything/account [${process.pid}] listen on http://localhost:${port}`
		)
	})
}
