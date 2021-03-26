import fs from 'fs'
import path from 'path'
import https from 'https'
import cors from 'cors'
import bodyParser from 'body-parser'

import express from 'express'
import MerossHelper from './helpers/MerossHelper'
import HueHelper from './helpers/HueHelper'
import TwitchHelper from './helpers/TwitchHelper'

import merossConfiguration from '@/../../.configuration/meross.json'
import hueConfiguration from '@/../../.configuration/hue.json'
import twitchConfiguration from '@/../../.configuration/twitch.json'

import createLightRouter from './routers/lightRouter'
import createTwitchWebhooksRouter from './routers/twitchWebhooksRouter'

const app = express()
const PORT = 4040

const httpsOptions = {
  key: fs.readFileSync(path.resolve(__dirname, './../../.configuration/cert/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './../../.configuration/cert/server.crt')),
}
const meross = new MerossHelper(merossConfiguration)
const hueHelper = new HueHelper(hueConfiguration)
const twitchHelper = new TwitchHelper({ config: twitchConfiguration })

app.use(bodyParser.json({ type: ['text/plain', 'application/json'] }))
app.use(cors()) // TODO: add whitelist
app.use('/lights', createLightRouter({ hueHelper }))
app.use('/twitch-webhooks', createTwitchWebhooksRouter({ twitchHelper }))

// https.createServer(httpsOptions, app).listen(PORT, () => {
//   console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
// })

app.listen(PORT)
