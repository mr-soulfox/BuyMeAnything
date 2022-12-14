import cluster from 'cluster'
import express from 'express'
import {deleteUser} from '../database/client/nosql/controller/user/delete'
import {Modify, PostgresClient} from '../database/client/sql'
import {logRequest} from '../middleware/log'
import {createAccount} from './modules/create'
import {forgotPassword} from './modules/forgot'
import {modifyAccount} from './modules/modify'
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

routes.post('/forgot-password', async (req, res) => {
	const forgotParams = {
		email: req.body.email,
		password: req.body.password,
		verified: req.body.verified,
		code: req.body.code,
	}

	const response = await forgotPassword(forgotParams)

	if (response?.redirect) {
		res.redirect(308, `${process.env.BASE_URL}modify`)
		cluster.worker?.kill()
		return
	}

	res.json(response)
	cluster.worker?.kill()
})

routes.post('/create', async (req, res) => {
	const response = await createAccount(req.body.email, req.body.password)

	if (response.data != null) {
		const data = response.data.mongoCache
		res.redirect(
			301,
			`/main/login?cached=true&data=${encodeURIComponent(JSON.stringify(data))}`
		)
		cluster.worker?.kill()

		return
	}

	res.json(response)
	cluster.worker?.kill()
})

routes.post('/modify', async (req, res) => {
	const bodyData: Modify = {
		email: req.body.email,
		password: req.body.password,
		userAt: req.body.userAt,
		username: req.body.username,
		social: req.body.socialData,
	}

	const response = await modifyAccount(
		bodyData,
		req.body.newEmail,
		req.body.verify,
		req.body.code,
		req.body.social
	)
	res.json(response)

	cluster.worker?.kill()
})

routes.delete('/delete', async (req, res) => {
	const pgClient = new PostgresClient()

	const exist = await pgClient.exist(req.body.email)

	if (exist) {
		res.json({
			status: false,
			msg: "This email don't exist",
		})

		cluster.worker?.kill()
		return
	}

	const response = await pgClient.delete(req.body.email)
	await pgClient.disconnect()

	const deleted = await deleteUser(req.body.email)

	res.json({
		deleted: response == deleted,
		mongo: deleted,
		db: response,
	})
	cluster.worker?.kill()
})
