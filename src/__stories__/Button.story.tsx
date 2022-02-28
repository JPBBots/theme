import { Meta } from '@storybook/react'
import { VStack, Text, HStack, Button, Box } from '@chakra-ui/react'

export default {
  title: 'Button',
  component: Button,
} as Meta

export const _Button = () => (
  <VStack>
    <HStack>
      <VStack>
        <Text>Default Buttons</Text>
        <Button>Default Large</Button>
        <Button size="sm">Default Small</Button>
      </VStack>
      <VStack>
        <Text>Primary Buttons</Text>
        <Button variant="primary">Primary Large</Button>
        <Button size="sm" variant="primary">
          Primary Small
        </Button>
      </VStack>
    </HStack>
    <Box bg="brand.100" p="20px">
      <Button variant="dark">Dark</Button>
    </Box>
    <Button variant="brand">Brand</Button>
    <Button variant="ghost">Ghost</Button>
  </VStack>
)
