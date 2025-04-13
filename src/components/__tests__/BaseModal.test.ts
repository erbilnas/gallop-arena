import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseModal from '../common/BaseModal.vue'

describe('BaseModal', () => {
  it('renders properly with title', () => {
    const title = 'Test Modal'
    const wrapper = mount(BaseModal, {
      props: {
        title,
      },
      slots: {
        default: 'Modal Content',
      },
    })

    expect(wrapper.find('.modal-header h2').text()).toBe(title)
    expect(wrapper.find('.modal-body').text()).toBe('Modal Content')
  })

  it('emits close event when clicking the close button', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        title: 'Test Modal',
      },
    })

    await wrapper.find('.close-button').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('emits close event when clicking the overlay', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        title: 'Test Modal',
      },
    })

    await wrapper.find('.modal-overlay').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('close')
  })

  it('does not emit close event when clicking the modal content', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        title: 'Test Modal',
      },
    })

    await wrapper.find('.modal-content').trigger('click')
    expect(wrapper.emitted()).not.toHaveProperty('close')
  })

  it('has correct CSS classes and structure', () => {
    const wrapper = mount(BaseModal, {
      props: {
        title: 'Test Modal',
      },
    })

    expect(wrapper.find('.modal-overlay').exists()).toBe(true)
    expect(wrapper.find('.modal-content').exists()).toBe(true)
    expect(wrapper.find('.modal-header').exists()).toBe(true)
    expect(wrapper.find('.modal-body').exists()).toBe(true)
  })
})
