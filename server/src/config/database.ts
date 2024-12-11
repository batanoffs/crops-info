import mongoose, { Mongoose } from 'mongoose'

require('../models/Crop')
require('../models/Pest')
require('../models/Disease')
require('../models/CropCategory')
require('../models/User')

mongoose.set('strictQuery', false)

async function configDatabase(mongooseInstance: Mongoose = mongoose): Promise<void> {
	try {
		await mongooseInstance.connect(process.env.MONGO_URI as string)
	} catch (error) {
		console.error('Database connection error:', error)
	}
}

export { configDatabase }
