import { Meta } from '@storybook/react'
import { VStack } from '@chakra-ui/react'
import { TimeSelector } from '.'
import { useState } from 'react'

export default {
  title: 'Time Selector',
  component: TimeSelector,
} as Meta

export const _TimeSelector = () => {
  const [value, setValue] = useState(100e3)
  return (
    <VStack>
      <TimeSelector
        times={[120e3, 320e3]}
        value={value}
        max={1238912389012312038129038}
        onChange={(val) => setValue(val as number)}
      />
    </VStack>
  )
}
