import express from 'express'
import middlewareSetup from './middlewares'

const app = express()
middlewareSetup(app) // Middlewares

export default app
