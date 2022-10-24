import cluster from 'cluster'
import express from 'express'
import {logRequest} from '../middleware/log'
import {Email, emailInstance, EmailParams} from '../utils/mail'

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
	if (req.body.verify) {
		try {
			const params: EmailParams = {
				type: 'email',
				to: req.body.email,
				subject: 'Verify email',
			}

			const email = new Email(params)
			await email.sendMail()
			res.json({
				complete: true,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				error: 500,
				msg: 'Internal error, try again later.',
			})
		}

		cluster.worker?.kill()
		return
	}

	const params = {
		key: req.body.email,
		code: req.params.code,
	}

	const result = await emailInstance.verifyCode(params)
	res.status(200).json(result)

	cluster.worker?.kill()
})

routes.post('/create', (req, res) => {
	res.send()
	cluster.worker?.kill()
})

routes.put('/modify', (req, res) => {
	res.send()
	cluster.worker?.kill()
})

routes.delete('/delete', (req, res) => {
	res.send()
	cluster.worker?.kill()
})
