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
  name: "Send template",
  options: option.object({
    templateName: option.string.layout({
      label: 'Template name',
      placeholder: 'Template name',
    }),
    templateParams: option.array(
      option.object({
        name: option.string.layout({
          label: 'Name',
          isRequired: true,
        }),
        value: option.string.layout({
          label: 'Value',
          isRequired: true,
        }),
      })

    ).layout({ accordion: 'Template params', itemLabel: 'new', isOrdered: true }),
  }),
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        templateName,
        templateParams,
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
            templateName,
            templateParams
          },
        })
        .json<SeleneBOTUpdateNameResponse>()
    },
  },
}) 
