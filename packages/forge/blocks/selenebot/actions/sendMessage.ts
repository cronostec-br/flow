import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const sendMessage = createAction({
  baseOptions,
  auth,
  name: 'Enviar mensagem',
  options: option.object({
    message: option.string.layout({
      label: 'Mensagem',
      placeholder: 'Olá, bom dia',
      inputType: 'textarea',
      withVariableButton: false
    }),
  }),
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        message,
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
            name,
          },
        })
        .json<SeleneBOTUpdateNameResponse>()
    },
  },
})
