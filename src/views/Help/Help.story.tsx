import { Meta } from '@storybook/react'
import { Text, VStack } from '@chakra-ui/react'
import { Help } from '.'

export default {
  title: 'Help',
  component: Help,
} as Meta

export const _Help = () => (
  <VStack>
    <Text>
      Lorum ipsum <Help>This is a tooltip</Help>
    </Text>
  </VStack>
)
