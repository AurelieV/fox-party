import axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'

export default class TwitchHelper {
  constructor({ config }) {
    this.config = config
    this.isInit = this.fetchOauthToken()
  }
  private async fetchOauthToken() {
    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://id.twitch.tv/oauth2/token',
        headers: { 'Client-ID': this.config.clientId },
        params: {
          client_id: this.config.clientId,
          client_secret: this.config.apiSecret,
          grant_type: 'client_credentials',
        },
      })
      this.accessToken = data.access_token
    } catch (err) {
      console.log('err', err)
      throw err
    }
  }
  private async callTwitchApi(axiosParams, retry = 1) {
    await this.isInit
    try {
      const { data } = await axios({
        ...axiosParams,
        headers: { Authorization: `Bearer ${this.accessToken}`, 'Client-ID': this.config.clientId },
      })
      return data
    } catch (err) {
      if (retry > 0 && err.response && err.response.status === '401') {
        await this.fetchOauthToken()
        return this.callTwitchApi(axiosParams, retry - 1)
      } else {
        throw err
      }
    }
  }

  async getSubscriptions() {
    const { data } = await this.callTwitchApi({
      method: 'get',
      url: 'https://api.twitch.tv/helix/eventsub/subscriptions',
    })
    return data
  }
}
