import { FlexProps, Flex } from '@chakra-ui/react'

export interface MiddleWrapProps extends FlexProps {
  spacing: FlexProps['gridGap']
  reverse?: boolean
}

export function MiddleWrap({ spacing, reverse, ...props }: MiddleWrapProps) {
  return (
    <Flex
      wrap={reverse ? 'wrap-reverse' : 'wrap'}
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      gridGap={spacing}
      {...props}
    />
  )
}
