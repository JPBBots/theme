import {
  Text,
  HStack,
  Switch,
  FormControl,
  SwitchProps,
  Icon,
} from '@chakra-ui/react'
import { FaCrown } from 'react-icons/fa'

export interface OptionProps extends SwitchProps {
  name: string
  label: string
  isPremium?: boolean
  isDisabled?: boolean
}

export const Option = ({
  name,
  label,
  isPremium,
  isDisabled,
  ...switchProps
}: OptionProps) => {
  const color = isPremium
    ? `brand.${isDisabled ? 60 : 100}`
    : `lighter.${isDisabled ? 20 : 60}`

  return (
    <FormControl>
      <HStack
        as="label"
        htmlFor={name}
        p="md"
        w="full"
        rounded="sm"
        color={color}
        cursor="pointer"
        justify="space-between"
        transition=".12s ease"
        _hover={{ bg: 'lighter.5' }}
        pointerEvents={isDisabled ? 'none' : 'all'}
      >
        <HStack spacing="md">
          {isPremium && <Icon size="sm" as={FaCrown} />}
          <Text textStyle="heading.sm" color="inherit">
            {label}
          </Text>
        </HStack>
        <Switch
          id={name}
          name={name}
          aria-label={label}
          isDisabled={isDisabled}
          {...switchProps}
        />
      </HStack>
    </FormControl>
  )
}