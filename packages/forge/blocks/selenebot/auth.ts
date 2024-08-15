import { option, AuthDefinition } from '@typebot.io/forge'

export const auth = {
  type: 'encryptedCredentials',
  name: 'SeleneBOT Account',
  schema: option.object({
    apiKey: option.string.layout({
      label: 'Token',
      isRequired: true,
      inputType: 'password',
      helperText: 'You can generate an Token on your SeleneBOT > Profile.',
      withVariableButton: false,
      isDebounceDisabled: true,
    }),
  }),
} satisfies AuthDefinition
