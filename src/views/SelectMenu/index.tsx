import { useState } from 'react'

import { HStack, StackProps, Text } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Icon } from '@chakra-ui/icon'
import { FaAngleDown } from 'react-icons/fa'

interface SelectMenuProps extends Omit<StackProps, 'onChange'> {
  value: string
  prefix?: string
  onChange?: (val: string) => void
  options: Array<{
    id: string
    label: string
  }>
}

export function SelectMenu({
  value,
  prefix,
  onChange,
  options,
  ...stackProps
}: SelectMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <Menu
      gutter={16}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <MenuButton>
        <HStack
          minW="120px"
          bg="lighter.5"
          p="8px"
          borderRadius="md"
          justifyContent="space-between"
          border="2px solid"
          borderColor={open ? 'brand.100' : 'transparent'}
          {...stackProps}
        >
          <Text>
            {prefix}
            {options.find((x) => x.id === value)?.label ?? 'None'}
          </Text>
          <Icon color="white" as={FaAngleDown} />
        </HStack>
      </MenuButton>
      <MenuList
        maxH={{ mobile: '200px', tablet: '400px' }}
        overflowY="scroll"
        p="2px"
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.id}
            onClick={() => {
              onChange?.(opt.id)
            }}
          >
            {prefix ?? ''}
            {opt.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
