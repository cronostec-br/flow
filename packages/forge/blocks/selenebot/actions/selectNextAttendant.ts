import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const selectNextAttendant = createAction({
  baseOptions,
  auth,
  name: 'Selecionar próximo atendente',
  options: option.object({
    queueId: option.string.layout({
      label: 'Fila',
      placeholder: 'Qualified',
    }),
  }),
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        queueId,
        whatsappId,
      },
      variables,
    }) => {
      const res = await ky
        .post(apiBaseUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          json: {
            whatsappId,
            queueId,
          },
        })
        .json<SeleneBOTUpdateNameResponse>()
    },
  },
})
