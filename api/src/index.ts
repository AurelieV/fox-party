import express from 'express'
import MerossHelper from './helpers/MerossHelper'

import merossConfiguration from '@/../../.configuration/meross.json'

const app = express()
const PORT = 4040

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})

const meross = new MerossHelper(merossConfiguration)

async function main() {
  await meross.connect()
  let turn = 0
  async function changeLight() {
    if (turn % 2 === 0) {
      await meross.turnDeviceRed()
    } else {
      await meross.turnDevicePurple()
    }
    if (turn <= 20) {
      turn++
      setTimeout(changeLight, 2000)
    }
  }
  setTimeout(() => changeLight(), 3000)
}

main()
