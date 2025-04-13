import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseButton from '../common/BaseButton.vue'

describe('BaseButton', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    })

    expect(wrapper.text()).toBe('Click me')
    expect(wrapper.classes()).toContain('button')
    expect(wrapper.classes()).not.toContain('button--disabled')
    expect(wrapper.classes()).not.toContain('button--primary')
  })

  it('renders with primary variant', () => {
    const wrapper = mount(BaseButton, {
      props: {
        primary: true,
      },
      slots: {
        default: 'Primary Button',
      },
    })

    expect(wrapper.classes()).toContain('button--primary')
  })

  it('renders with icon', () => {
    const wrapper = mount(BaseButton, {
      props: {
        icon: '🚀',
      },
      slots: {
        default: 'With Icon',
      },
    })

    expect(wrapper.find('.button__icon').exists()).toBe(true)
    expect(wrapper.find('.button__icon').text()).toBe('🚀')
  })

  it('renders with different sizes', () => {
    const sizes = ['xs', 'small', 'large'] as const

    sizes.forEach((size) => {
      const wrapper = mount(BaseButton, {
        props: {
          size,
        },
      })

      expect(wrapper.classes()).toContain(`button--${size}`)
    })
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(BaseButton)

    await wrapper.trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })

    await wrapper.trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  it('applies disabled styles when disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('button--disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
