import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseBadge from '../common/BaseBadge.vue'

describe('BaseBadge', () => {
  it('renders properly with default props', () => {
    const wrapper = mount(BaseBadge, {
      slots: {
        default: 'Test Badge',
      },
    })

    expect(wrapper.text()).toBe('Test Badge')
    expect(wrapper.classes()).toContain('badge')
    expect(wrapper.classes()).not.toContain('badge--primary')
    expect(wrapper.classes()).not.toContain('badge--success')
    expect(wrapper.classes()).not.toContain('badge--info')
  })

  it('applies primary variant class', () => {
    const wrapper = mount(BaseBadge, {
      props: {
        primary: true,
      },
      slots: {
        default: 'Primary Badge',
      },
    })

    expect(wrapper.classes()).toContain('badge--primary')
  })

  it('applies success variant class', () => {
    const wrapper = mount(BaseBadge, {
      props: {
        success: true,
      },
      slots: {
        default: 'Success Badge',
      },
    })

    expect(wrapper.classes()).toContain('badge--success')
  })

  it('applies info variant class', () => {
    const wrapper = mount(BaseBadge, {
      props: {
        info: true,
      },
      slots: {
        default: 'Info Badge',
      },
    })

    expect(wrapper.classes()).toContain('badge--info')
  })

  it('applies different size classes', () => {
    const sizes = ['xs', 'small', 'large'] as const

    sizes.forEach((size) => {
      const wrapper = mount(BaseBadge, {
        props: {
          size,
        },
        slots: {
          default: `${size} Badge`,
        },
      })

      expect(wrapper.classes()).toContain(`badge--${size}`)
    })
  })

  it('has correct CSS structure', () => {
    const wrapper = mount(BaseBadge, {
      slots: {
        default: 'Test Badge',
      },
    })

    expect(wrapper.find('.badge').exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('SPAN')
  })

  it('applies multiple variant classes when specified', () => {
    const wrapper = mount(BaseBadge, {
      props: {
        primary: true,
        size: 'large',
      },
      slots: {
        default: 'Multi Variant Badge',
      },
    })

    expect(wrapper.classes()).toContain('badge--primary')
    expect(wrapper.classes()).toContain('badge--large')
  })
})
