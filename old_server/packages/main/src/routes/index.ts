import cluster from 'cluster'
import express from 'express'
import {logRequest} from '../middleware/log'

export const routes = express.Router()

routes.use(logRequest)

routes.get('/health', (req, res) => {
	res.json({
		status: true,
		msg: `HI from account API - ${process.pid}`,
	})
	cluster.worker?.kill()
})

routes.get('/login', (req, res) => {
	res.json(JSON.parse(String(req.query.data)))
})
