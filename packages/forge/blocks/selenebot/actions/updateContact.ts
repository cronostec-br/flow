import { createAction, option } from '@typebot.io/forge'
import { isDefined } from '@typebot.io/lib'
import ky from 'ky'
import { apiBaseUrl } from '../constants'
import { auth } from '../auth'
import { baseOptions } from '../baseOptions'
import { SeleneBOTUpdateNameResponse } from '../types'

export const updateContact = createAction({
  baseOptions,
  auth,
  name: 'Update Contact',
  options: option.object({
    name: option.string.layout({
      label: 'New name',
      placeholder: 'John The Moon',
      moreInfoTooltip:
        'The name that represents the contact',
    }),
    email: option.string.layout({
      label: 'New email',
      placeholder: 'myemail@test.com',
      moreInfoTooltip:
        'The name that represents the contact',
    }),
    attendantId: option.string.layout({
      label: 'Prefered attendant',
      placeholder: 'myemail@test.com',
      moreInfoTooltip:
        'Only fill if necessary',
    }),
    segmentId: option.string.layout({
      label: 'Segment',
      placeholder: 'myemail@test.com',
      isRequired: false,
      moreInfoTooltip:
        'Only fill if necessary',
    }),
    additionalInformations: option.array(
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

    ).layout({ accordion: 'Additional Information', itemLabel: 'new', isOrdered: true }),
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
        name,
        projectId,
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
            projectId,
            name,
          },
        })
        .json<SeleneBOTUpdateNameResponse>()

      responseMapping?.forEach((mapping) => {
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
      })
    },
  },
})
