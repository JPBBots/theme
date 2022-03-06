import { Meta } from '@storybook/react'
import { Text, VStack } from '@chakra-ui/react'
import { Fakearea } from '.'
import { useState } from 'react'

export default {
  title: 'Inputs/Fakearea',
  component: Fakearea,
} as Meta

export const _Fakearea = () => {
  const [value, setValue] = useState(
    'This is an unselectable area, but click me!',
  )
  return (
    <VStack>
      <Fakearea value={value} onChange={setValue} />
      <Text>a</Text>
    </VStack>
  )
}
