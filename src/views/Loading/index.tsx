import { Spinner } from '@chakra-ui/spinner'
import { Center } from '@chakra-ui/layout'

export function Loading() {
  return (
    <Center w="full">
      <Spinner />
    </Center>
  )
}
