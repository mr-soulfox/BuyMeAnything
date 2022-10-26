import cluster from 'cluster'
import express from 'express'
import {logRequest} from '../middleware/log'
import {verifyMail} from './modules/verifyMail'

export const routes = express.Router()

routes.use(logRequest)

routes.get('/health', (req, res) => {
	res.json({
		status: true,
		msg: `HI from account API - ${process.pid}`,
	})
	cluster.worker?.kill()
})

routes.post('/verify-mail/:code', async (req, res) => {
	const params = {
		verify: req.body.verify,
		to: req.body.email,
		code: req.params.code,
	}

	const response = await verifyMail(params)
	res.status(response?.error || 200).json(response)

	cluster.worker?.kill()
})

routes.post('/forgot-password', (req, res) => {
	res.send('ForgotPassword')
})

routes.post('/create', (req, res) => {
	res.send('create')
	cluster.worker?.kill()
})

routes.put('/modify', (req, res) => {
	res.send('modify')
	cluster.worker?.kill()
})

routes.delete('/delete', (req, res) => {
	res.send('delete')
	cluster.worker?.kill()
})
