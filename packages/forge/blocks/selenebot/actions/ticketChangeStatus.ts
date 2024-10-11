import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const ticketChangeStatus = createAction({
  baseOptions,
  auth,
  name: 'Alterar status',
  options: option.object({
    status: option.enum(['pending', 'open', 'closed']).layout({
      label: 'starts by',
      direction: 'row',
      defaultValue: 'pending',
    }),
    responseMapping: option
      .saveResponseArray([
        'ContactID',
        'Name',
        'Email',
        'Number',
      ] as const)
      .layout({
        accordion: 'Save response',
      }),
  }),
  getSetVariableIds: ({ responseMapping }) =>
    responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
  run: {
    server: async ({
      credentials: { apiKey },
      options: {
        status,
        whatsappId,
        responseMapping,
      },
      variables,
    }) => {
      console.log("chegou name", name)
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

      /*responseMapping?.forEach((mapping) => {
        if (!mapping.variableId || !mapping.item) return

        if (mapping.item === 'Name')
          variables.set(
            mapping.variableId,
            res.results.map((r) => r.name)
          )
        if (mapping.item === 'Number')
          variables.set(
            mapping.variableId,
            res.results.map((r) => r.number)
          )
        if (mapping.item === 'Email')
          variables.set(
            mapping.variableId,
            res.results.map((r) => r.email)
          )
        if (mapping.item === 'ContactID')
          variables.set(
            mapping.variableId,
            res.results.map((r) => r.id)
          )
      })*/
    },
  },
})
