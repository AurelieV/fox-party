import axios from 'axios'

type LIGHT = {
  bri: Number
  hue: Number
  sat: Number
}
const ALERT_LIGHT: LIGHT = {
  bri: 224,
  hue: 65171,
  sat: 254,
}

const BASE_LIGHT: LIGHT = {
  bri: 63,
  hue: 27735,
  sat: 215,
}

export default class HueHelper {
  private baseUrl
  constructor({ ip, username }) {
    this.baseUrl = `${ip}/api/${username}`
  }

  async changeLight(lightId: Number = 1, light: LIGHT) {
    try {
      const { data } = await axios({
        method: 'put',
        url: `${this.baseUrl}/lights/${lightId}/state`,
        data: {
          ...light,
          on: true,
        },
      })
    } catch (err) {
      throw err
    }
  }

  async turnAlertLight(lightId: Number) {
    this.changeLight(lightId, ALERT_LIGHT)
  }

  async turnBaseLight(lightId: Number) {
    this.changeLight(lightId, BASE_LIGHT)
  }

  async flash(lightId: Number) {
    await this.turnAlertLight(lightId)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    await this.turnBaseLight(lightId)
  }
}
