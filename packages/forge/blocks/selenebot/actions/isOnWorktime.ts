import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const isOnWorktime = createAction({
  baseOptions,
  auth,
  name: 'Is on worktime',
  options: option.object({
    responseMapping: option
      .saveResponseArray([
        'IsOnWorktime'
      ] as const)
      .layout({
        accordion: 'Salvar resposta',
      }),
  }),
  getSetVariableIds: ({ responseMapping }) =>
    responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
  run: {
    server: async ({
      options: {
        responseMapping,
      },
      variables,
    }) => {
      console.log("chegou name", name)
      const res = await ky
        .post(apiBaseUrl, {
          headers: {
            Authorization: `Bearer ${variables.get("token")}`,
          },
          json: {
            whatsappId,
            name,
          },
        })
        .json<SeleneBOTUpdateNameResponse>()

      responseMapping?.forEach((mapping) => {
        if (!mapping.variableId || !mapping.item) return

        if (mapping.item === 'IsOnWorktime')
          variables.set(
            mapping.variableId,
            res.results.map((r) => r.IsOnWorktime)
          )
      })
    },
  },
})
