import { Meta } from '@storybook/react'
import { VStack, Spinner } from '@chakra-ui/react'

export default {
  title: 'Spinner',
  component: Spinner,
} as Meta

export const _Spinner = () => (
  <VStack>
    <Spinner />
  </VStack>
)
