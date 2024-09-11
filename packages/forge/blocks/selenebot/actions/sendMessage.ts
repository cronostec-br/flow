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
  name: 'Send message',
  options: option.object({
    message: option.string.layout({
      label: 'Message',
      placeholder: 'Message',
    }),
  }),
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        message,
        projectId,
      },
      variables,
    }) => {
      const res = await ky
        .post(apiBaseUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          json: {
            projectId,
            name,
          },
        })
        .json<SeleneBOTUpdateNameResponse>()
    },
  },
})
