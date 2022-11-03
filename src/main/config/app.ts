import express from 'express'
import middlewareSetup from './middlewares'
import routesSetup from './routes'

const app = express()
middlewareSetup(app) // Middlewares
routesSetup(app) // Routers

export default app
