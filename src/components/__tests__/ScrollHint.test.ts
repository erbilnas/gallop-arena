import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ScrollHint from '../ScrollHint.vue'

describe('ScrollHint', () => {
  it('renders correctly', () => {
    const wrapper = mount(ScrollHint)

    // Check if the component exists
    expect(wrapper.exists()).toBe(true)

    // Check if the scroll hint text is present
    expect(wrapper.text()).toContain('Scroll or drag to see all horses')

    // Check if the icon is present
    expect(wrapper.find('.scroll-hint__icon').exists()).toBe(true)
    expect(wrapper.find('.scroll-hint__icon').text()).toBe('🖱️')
  })

  it('has correct CSS classes', () => {
    const wrapper = mount(ScrollHint)

    // Check if the main container has the correct class
    expect(wrapper.find('.scroll-hint').exists()).toBe(true)

    // Check if the icon has the correct class
    expect(wrapper.find('.scroll-hint__icon').exists()).toBe(true)
  })

  it('has correct styling', () => {
    const wrapper = mount(ScrollHint)
    const element = wrapper.find('.scroll-hint')

    // Check if the element has the correct classes that correspond to the styles
    expect(element.classes()).toContain('scroll-hint')
    expect(element.find('.scroll-hint__icon').exists()).toBe(true)
  })
})
