import { Router } from 'express'
import HueHelper from './HueHelper'

type LightRouterOptions = {
  hueHelper: HueHelper
}
export default function createRouter({ hueHelper }: LightRouterOptions) {
  const router = new Router()

  router.post('/flash', async (req, res) => {
    try {
      await hueHelper.flash()
      res.send(200)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  return router
}
