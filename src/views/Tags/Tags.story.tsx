import { Meta } from '@storybook/react'
import { VStack } from '@chakra-ui/react'
import { Tags } from '.'
import { useState } from 'react'

export default {
  title: 'Tags',
  component: Tags,
} as Meta

export const _Tags = () => {
  const [value, setValue] = useState(['1', '2'])
  return (
    <VStack>
      <Tags
        placeholder="Add"
        settings={{
          whitelist: [
            {
              value: 'a',
              id: '1',
            },
            {
              value: 'b',
              id: '2',
            },
            {
              value: 'c',
              id: '3',
            },
          ],
        }}
        onChange={(v) => setValue(v)}
        value={value}
      />

      <Tags
        placeholder="A"
        settings={{}}
        onChange={(v) => setValue(v)}
        value={value}
      />
    </VStack>
  )
}
