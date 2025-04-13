import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseTooltip from '../common/BaseTooltip.vue'

describe('BaseTooltip', () => {
  it('renders properly with primary content', () => {
    const content = 'Test Tooltip'
    const wrapper = mount(BaseTooltip, {
      props: {
        content,
      },
    })

    expect(wrapper.find('.tooltip__primary').text()).toBe(content)
    expect(wrapper.find('.tooltip__secondary').exists()).toBe(false)
  })

  it('renders with secondary content and icon', () => {
    const content = 'Primary Content'
    const secondaryContent = 'Secondary Content'
    const secondaryIcon = '🔔'

    const wrapper = mount(BaseTooltip, {
      props: {
        content,
        secondaryContent,
        secondaryIcon,
      },
    })

    expect(wrapper.find('.tooltip__primary').text()).toBe(content)
    expect(wrapper.find('.tooltip__secondary').text()).toContain(secondaryContent)
    expect(wrapper.find('.tooltip__icon').text()).toBe(secondaryIcon)
  })

  it('applies correct position class', () => {
    const positions = ['left', 'right', 'top', 'bottom'] as const

    positions.forEach((position) => {
      const wrapper = mount(BaseTooltip, {
        props: {
          content: 'Test Tooltip',
          position,
        },
      })

      expect(wrapper.classes()).toContain(`tooltip--${position}`)
    })
  })

  it('has correct CSS structure', () => {
    const wrapper = mount(BaseTooltip, {
      props: {
        content: 'Test Tooltip',
      },
    })

    expect(wrapper.find('.tooltip').exists()).toBe(true)
    expect(wrapper.find('.tooltip__content').exists()).toBe(true)
    expect(wrapper.find('.tooltip__primary').exists()).toBe(true)
  })

  it('renders with default position when not specified', () => {
    const wrapper = mount(BaseTooltip, {
      props: {
        content: 'Test Tooltip',
      },
    })

    expect(wrapper.classes()).toContain('tooltip--right')
  })
})
