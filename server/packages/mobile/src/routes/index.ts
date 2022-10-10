import {Router} from 'express'
import {logRequest} from '../middleware/log'

export const router = Router()

router.use(logRequest)

router.get('/', (req, res) => {
	res.send('<h1>HI From mobile websocket api callout</h1>')
})
