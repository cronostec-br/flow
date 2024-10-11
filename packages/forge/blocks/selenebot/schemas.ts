// Do not edit this file manually
import { parseBlockCredentials, parseBlockSchema } from '@typebot.io/forge'
import { selenebotBlock } from '.'

export const selenebotBlockSchema = parseBlockSchema(selenebotBlock)
export const selenebotCredentialsSchema = parseBlockCredentials(selenebotBlock)
