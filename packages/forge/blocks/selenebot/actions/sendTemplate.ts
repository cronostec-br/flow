import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const sendTemplate = createAction({
  baseOptions,
  auth,
  name: "Enviar modelo de mensagem (meta template)",
  options: option.object({
    templateName: option.string.layout({
      label: 'Nome temlate',
      placeholder: 'mensagem_boas_vindas',
    }),
    templateParams: option.array(
      option.object({
        value: option.string.layout({
          label: 'Valor',
          isRequired: true,
        }),
      })

    ).layout({ accordion: 'Parâmetros', itemLabel: 'new', isOrdered: true }),
  }),
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        templateName,
        templateParams,
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
            templateName,
            templateParams,
            variables
          },
        })
        .json<SeleneBOTUpdateNameResponse>()
    },
  },
}) 
