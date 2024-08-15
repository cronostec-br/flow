import { createBlock } from '@typebot.io/forge'
import { SelenebotLogoDark, SelenebotLogoLight } from './logo'
import { auth } from './auth'
import { updateContact } from './actions/updateContact'
import ky from 'ky'
import { addTag } from './actions/addTag'
import { removeTag } from './actions/removeTag'

export const selenebotBlock = createBlock({
  id: 'selenebot',
  name: 'SeleneBOT',
  tags: ['selenebot'],
  LightLogo: SelenebotLogoLight,
  DarkLogo: SelenebotLogoDark,
  auth,
  fetchers: [
    {
      id: 'fetchProjects',
      dependencies: [],
      fetch: async ({ credentials }) => {
        if (!credentials?.apiKey) return []

        const url = 'https://api.zemantic.ai/v1/projects'

        const response = await ky
          .get(url, {
            headers: {
              Authorization: `Bearer ${credentials.apiKey}`,
            },
          })
          .json()

        const projectsData = response as {
          id: string
          name: string
        }[]

        return projectsData.map((project) => ({
          label: project.name,
          value: project.id,
        }))
      },
    },
  ],
  actions: [updateContact, addTag, removeTag],
})
