import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const removeTag = createAction({
  baseOptions,
  auth,
  name: 'Remove Tag',
  options: option.object({
    name: option.string.layout({
      label: 'Tag name',
      placeholder: 'Qualified',
    }),
  }),
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        name,
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
