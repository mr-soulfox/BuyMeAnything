import cluster from 'cluster'
import express from 'express'
import {logRequest} from '../middleware/log'

export const routes = express.Router()

routes.use(logRequest)

routes.get('/', (req, res) => {
	res.send('<h1>HI from account API -' + process.pid + '</h1>')
	cluster.worker?.kill()
})
