import { Tooltip as ChakraTooltip } from '@chakra-ui/tooltip'

import { Flex } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/react'

import { FaRegQuestionCircle } from 'react-icons/fa'

export interface HelpProps {
  children: string
}

export const Help = ({ children }: HelpProps) => {
  return (
    <ChakraTooltip
      hasArrow
      bg="black"
      opacity={100}
      p={2}
      justifySelf="center"
      color="white"
      borderRadius="md"
      label={`${children}`}
    >
      <Flex
        display="inline-block"
        alignItems="center"
        justifyItems="center"
        userSelect="none"
      >
        <Icon as={FaRegQuestionCircle} mb="-2px" />
      </Flex>
    </ChakraTooltip>
  )
}
