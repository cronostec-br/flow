import { createAction, option } from '@typebot.io/forge'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { SeleneBOTAddTagResponse } from '../types'

export const addTag = createAction({
  name: 'Adicionar Tag',
  options: option.object({
    tags: option.array(
      option.object({
        name: option.string.layout({
          label: 'Tag',
          isRequired: true,
          placeholder: 'Não qualificado',
        })
      })
    )
  }),
  run: {
    server: async ({
      options: {
        tags,
      },
      variables,
    }) => {
      const res = await ky
        .post(apiBaseUrl, {
          headers: {
            Authorization: `Bearer ${variables.get("token")}`,
          },
          json: {
            ticketId: variables.get("ticketId"),
            tags,
            variables
          },
        })
        .json<SeleneBOTAddTagResponse>()
    },
  },
})
