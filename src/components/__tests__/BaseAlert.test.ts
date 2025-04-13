import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseAlert from '../common/BaseAlert.vue'

describe('BaseAlert', () => {
  it('renders properly with message', () => {
    const message = 'Test Alert Message'
    const wrapper = mount(BaseAlert, {
      props: {
        message,
      },
    })

    expect(wrapper.find('.base-alert__message').text()).toBe(message)
    expect(wrapper.find('.base-alert__close').exists()).toBe(false)
  })

  it('renders with different types', () => {
    const types = ['info', 'success', 'warning', 'error'] as const
    const message = 'Test Alert'

    types.forEach((type) => {
      const wrapper = mount(BaseAlert, {
        props: {
          type,
          message,
        },
      })

      expect(wrapper.classes()).toContain(`base-alert--${type}`)
      expect(wrapper.find('.base-alert__icon').exists()).toBe(true)
    })
  })

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const
    const message = 'Test Alert'

    sizes.forEach((size) => {
      const wrapper = mount(BaseAlert, {
        props: {
          size,
          message,
        },
      })

      expect(wrapper.classes()).toContain(`base-alert--${size}`)
    })
  })

  it('shows close button when closable is true', () => {
    const wrapper = mount(BaseAlert, {
      props: {
        message: 'Test Alert',
        closable: true,
      },
    })

    expect(wrapper.find('.base-alert__close').exists()).toBe(true)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(BaseAlert, {
      props: {
        message: 'Test Alert',
        closable: true,
      },
    })

    await wrapper.find('.base-alert__close').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('renders custom icon when provided', () => {
    const wrapper = mount(BaseAlert, {
      props: {
        message: 'Test Alert',
      },
      slots: {
        icon: '🔔',
      },
    })

    expect(wrapper.find('.base-alert__icon').text()).toBe('🔔')
  })

  it('has correct CSS structure', () => {
    const wrapper = mount(BaseAlert, {
      props: {
        message: 'Test Alert',
      },
    })

    expect(wrapper.find('.base-alert').exists()).toBe(true)
    expect(wrapper.find('.base-alert__content').exists()).toBe(true)
    expect(wrapper.find('.base-alert__message').exists()).toBe(true)
  })

  it('applies multiple classes when type and size are specified', () => {
    const wrapper = mount(BaseAlert, {
      props: {
        message: 'Test Alert',
        type: 'success',
        size: 'large',
      },
    })

    expect(wrapper.classes()).toContain('base-alert--success')
    expect(wrapper.classes()).toContain('base-alert--large')
  })
})
