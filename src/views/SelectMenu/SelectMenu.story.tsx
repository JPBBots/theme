import { Meta } from '@storybook/react'
import { VStack } from '@chakra-ui/react'
import { SelectMenu } from '.'
import { useState } from 'react'

export default {
  title: 'Inputs/Select Menu',
  component: SelectMenu,
} as Meta

export const _SelectMenu = () => {
  const [value, setValue] = useState('1')
  return (
    <VStack>
      <SelectMenu
        value={value}
        onChange={(val) => setValue(val)}
        options={[
          {
            id: '1',
            label: 'one',
          },
          {
            id: '2',
            label: 'two',
          },
          {
            id: '3',
            label: 'three',
          },
          {
            id: '4',
            label: 'four',
          },
        ]}
      />
    </VStack>
  )
}
