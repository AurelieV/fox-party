import MerossCloud, { MerossCloudDevice } from 'meross-cloud'

type Color = {
  capacity: number
  channel: number
  rgb: number
  temperature: number
  luminance: number
  transform: number
}
const PURPLE_LIGHT: Color = {
  capacity: 5,
  channel: 0,
  rgb: 16711900,
  temperature: 100,
  luminance: 100,
  transform: -1,
}

const RED_LIGHT: Color = {
  capacity: 5,
  channel: 0,
  rgb: 16711698,
  temperature: 100,
  luminance: 100,
  transform: -1,
}

export default class MerossHelper {
  private meross: MerossCloud
  private devices: Map<string, MerossCloudDevice> = new Map()

  constructor(options: { email: string; password: string }) {
    const merossOptions = {
      ...options,
      logger: () => {},
    }
    this.meross = new MerossCloud(merossOptions)
    this.meross.on('deviceInitialized', (deviceId, deviceDef, device) => {
      device.on('connected', () => {
        this.devices.set(deviceId, device)
      })
      device.on('close', () => {
        this.devices.delete(deviceId)
      })
    })
  }

  connect(): Promise<undefined> {
    return new Promise((resolve, reject) => {
      this.meross.connect((error) => {
        if (error) {
          reject(error)
        } else {
          resolve(undefined)
        }
      })
    })
  }

  changeColor(color: Color): Promise<undefined> {
    const deviceId = [...this.devices.keys()][0]
    if (!deviceId) {
      return Promise.reject('NON_EXISTING_DEVICE_ID')
    }
    return new Promise((resolve, reject) => {
      const device = this.devices.get(deviceId)
      device?.controlLight(color, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(undefined)
        }
      })
    })
  }

  turnDevicePurple(): Promise<undefined> {
    return this.changeColor(PURPLE_LIGHT)
  }

  turnDeviceRed(): Promise<undefined> {
    return this.changeColor(RED_LIGHT)
  }

  getDeviceCurrentData(): Promise<unknown> {
    const deviceId = [...this.devices.keys()][0]
    if (!deviceId) {
      return Promise.reject('NON_EXISTING_DEVICE_ID')
    }
    return new Promise((resolve, reject) => {
      const device = this.devices.get(deviceId)
      device?.getSystemAllData((err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}
