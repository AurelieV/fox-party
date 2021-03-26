import FoxBot from './bot'

import botConfig from '@/../../.configuration/bot.json'

const bot = new FoxBot({ config: botConfig })
bot.start()
