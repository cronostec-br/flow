import { createAction, option } from '@typebot.io/forge'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { SeleneBOTRemoveTagResponse } from '../types'

export const removeTag = createAction({
  name: "Remover Tag",
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
        .json<SeleneBOTRemoveTagResponse>()
    },
  },
})
