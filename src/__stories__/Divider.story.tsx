import { Meta } from '@storybook/react'
import { Divider, VStack } from '@chakra-ui/react'

export default {
  title: 'Divider',
  component: Divider,
} as Meta

export const _Divider = () => (
  <VStack>
    <Divider />
    <Divider />
    <Divider />
    <Divider />
    <Divider />
  </VStack>
)
