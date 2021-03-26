import tmi from 'tmi.js'
import axios from 'axios'

export default class FoxBot {
  constructor({ config }) {
    this.config = config
    this.alertTimeout = null
  }

  async start() {
    const client = new tmi.client(this.config)

    client.on('message', (...data) => this.onMessageHandler(...data))
    client.on('connected', async () => {
      await client.say(this.config.channels[0], 'Le renard est dans la place!')
      console.log('Fox is in place')
    })
    client.connect()
    this.client = client
  }

  async onMessageHandler(channel, context, msg, self) {
    if (self) return
    if (!msg.startsWith('!')) return

    switch (msg) {
      case '!alert':
        if (this.alertTimeout) return
        try {
          await axios({
            method: 'post',
            url: `http://localhost:4040/lights/flash`,
          })
          this.alertTimeout = setTimeout(() => {
            this.alertTimeout = null
          }, 2000)
        } catch (err) {
          console.log(err)
          throw err
        }
        break
    }
  }
}
