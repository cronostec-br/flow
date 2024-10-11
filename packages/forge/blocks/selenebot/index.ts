import { createBlock } from '@typebot.io/forge'
import { SelenebotLogoDark, SelenebotLogoLight } from './logo'
import { auth } from './auth'
import { updateContact } from './actions/updateContact'
import ky from 'ky'
import { addTag } from './actions/addTag'
import { removeTag } from './actions/removeTag'
import { sendTemplate } from './actions/sendTemplate'
import { sendMessage } from './actions/sendMessage'
import { selectNextAttendant } from './actions/selectNextAttendant'
import { ticketSelectUser } from './actions/ticketSelectUser'
import { ticketSelectQueue } from './actions/ticketSelectQueue'
import { ticketExitBot } from './actions/ticketExitBot'
import { ticketChangeStatus } from './actions/ticketChangeStatus'
import { isOnWorktime } from './actions/isOnWorktime'
import { getQueues } from './actions/getQueues'

export const selenebotBlock = createBlock({
  id: 'selenebot',
  name: 'SeleneBOT',
  tags: ['selenebot'],
  LightLogo: SelenebotLogoLight,
  DarkLogo: SelenebotLogoDark,
  actions: [
    updateContact,
    addTag,
    removeTag,
    sendTemplate,
    sendMessage,
    selectNextAttendant,
    getQueues,
    isOnWorktime,
    ticketChangeStatus,
    ticketExitBot,
    ticketSelectQueue,
    ticketSelectUser,
  ],
})
