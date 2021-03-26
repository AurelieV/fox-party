import { Router } from 'express'
import TwitchHelper from './TwitchHelper'

type TwitchWebhookRouterOptions = {
  twitchHelper: TwitchHelper
}
export default function createRouter({ twitchHelper }: TwitchWebhookRouterOptions) {
  const router = new Router()

  router.get('/subscriptions', async (req, res) => {
    try {
      const subscriptions = await twitchHelper.getSubscriptions()
      res.json(subscriptions)
    } catch (err) {
      res.status(500).send(err)
    }
  })

  return router
}
