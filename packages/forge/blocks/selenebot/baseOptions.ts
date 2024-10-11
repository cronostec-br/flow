import { option } from '@typebot.io/forge'

export const baseOptions = option.object({
  whatsappId: option.string.layout({
    placeholder: 'Selecione a conexão',
    fetcher: 'fetchConnections'
  }),
})