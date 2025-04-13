import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseCheckbox from '../common/BaseCheckbox.vue'

describe('BaseCheckbox', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    expect(wrapper.find('.base-checkbox__label').exists()).toBe(false)
  })

  it('renders with label when provided', () => {
    const label = 'Test Checkbox'
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
        label,
      },
    })

    expect(wrapper.find('.base-checkbox__label').text()).toBe(label)
  })

  it('emits update:modelValue when checkbox is clicked', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.find('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits update:modelValue when space key is pressed', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.find('input').trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('emits update:modelValue when enter key is pressed', async () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
      },
    })

    await wrapper.find('input').trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
  })

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('base-checkbox--disabled')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('applies required attribute when required prop is true', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
        required: true,
      },
    })

    expect(wrapper.find('input').attributes('required')).toBeDefined()
  })

  it('applies correct aria attributes', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: true,
        label: 'Test Checkbox',
        disabled: true,
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-checked')).toBe('true')
    expect(input.attributes('aria-disabled')).toBe('true')
    expect(input.attributes('aria-label')).toBe('Test Checkbox')
  })

  it('applies id and name attributes when provided', () => {
    const wrapper = mount(BaseCheckbox, {
      props: {
        modelValue: false,
        id: 'test-id',
        name: 'test-name',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('id')).toBe('test-id')
    expect(input.attributes('name')).toBe('test-name')
  })
})
