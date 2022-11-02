import mongoose from 'mongoose'

const User = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		select: true,
	},
	username: {
		type: String,
		select: true,
	},
	userAt: {
		type: String,
		unique: true,
		select: true,
	},
	salt: {
		type: String,
		unique: true,
		required: true,
	},
	socialLogin: {
		social: {
			type: String,
			default: '',
		},
		code: {
			type: String,
			default: '',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

export default mongoose.model('User', User)
