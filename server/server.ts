// @ts-ignore

const express = require('express')
require('dotenv').config()
import { configDatabase } from './src/config/database'
import { configExpress } from './src/config/express'
import { configRoutes } from './src/config/routes'

// import { registerUser } from './src/services/user';
// import { createToken } from './src/services/jwt';

const app = express()

try {
	configExpress(app)
	configDatabase()
	configRoutes(app)

	const port = process.env.PORT || 5001
	app.listen(port, () => {
		console.log(`Server is running on port ${process.env.PORT}`)
	})

	// test();
} catch (error) {
	console.error('Server connection error:', error)
}

// async function test() {
//     try {
//         const result = await registerUser('admin@email.com', 'password', 'admin');
//         // const result = await login("daniel@gmail.com", "123456");
//         const token = createToken(result);
//     } catch (error: any) {
//         console.error(`Caught Error: ${error.message}`);
//     }
// }
