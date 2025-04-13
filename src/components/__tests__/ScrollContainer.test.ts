import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ComponentPublicInstance } from 'vue'
import ScrollContainer from '../ScrollContainer.vue'

interface ScrollContainerInstance extends ComponentPublicInstance {
  isDragging: boolean
  startY: number
  scrollTop: number
}

describe('ScrollContainer', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(ScrollContainer, {
      slots: {
        default: '<div class="test-content" style="height: 2000px">Test Content</div>',
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders correctly', () => {
    expect(wrapper.find('.scroll-container').exists()).toBe(true)
  })

  it('applies maxHeight prop correctly', () => {
    const customHeight = '500px'
    wrapper = mount(ScrollContainer, {
      props: {
        maxHeight: customHeight,
      },
    })
    expect(wrapper.find('.scroll-container').attributes('style')).toContain(
      `max-height: ${customHeight}`,
    )
  })

  it('handles mouse drag events', async () => {
    const container = wrapper.find('.scroll-container')

    const mockEvent = {
      pageY: 100,
      preventDefault: vi.fn(),
      altKey: false,
      button: 0,
      buttons: 1,
      clientX: 0,
      clientY: 100,
      ctrlKey: false,
      metaKey: false,
      movementX: 0,
      movementY: 0,
      offsetX: 0,
      offsetY: 100,
      pageX: 0,
      screenX: 0,
      screenY: 100,
      shiftKey: false,
      x: 0,
      y: 100,
    } as unknown as MouseEvent

    // Start drag
    await container.trigger('mousedown', mockEvent)
    const vm = wrapper.vm as unknown as ScrollContainerInstance
    expect(vm.isDragging).toBe(true)
    expect(vm.startY).toBe(100)

    // During drag
    const moveEvent = {
      pageY: 200,
      preventDefault: vi.fn(),
      altKey: false,
      button: 0,
      buttons: 1,
      clientX: 0,
      clientY: 200,
      ctrlKey: false,
      metaKey: false,
      movementX: 0,
      movementY: 0,
      offsetX: 0,
      offsetY: 200,
      pageX: 0,
      screenX: 0,
      screenY: 200,
      shiftKey: false,
      x: 0,
      y: 200,
    } as unknown as MouseEvent
    await container.trigger('mousemove', moveEvent)
    expect(wrapper.emitted('scroll')).toBeTruthy()

    // Stop drag
    await container.trigger('mouseup')
    expect(vm.isDragging).toBe(false)
  })

  it('handles keyboard navigation', async () => {
    const container = wrapper.find('.scroll-container')

    // Test ArrowUp
    await container.trigger('keydown', { key: 'ArrowUp' })
    expect(wrapper.emitted('scroll')).toBeTruthy()

    // Test ArrowDown
    await container.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.emitted('scroll')).toBeTruthy()

    // Test PageUp
    await container.trigger('keydown', { key: 'PageUp' })
    expect(wrapper.emitted('scroll')).toBeTruthy()

    // Test PageDown
    await container.trigger('keydown', { key: 'PageDown' })
    expect(wrapper.emitted('scroll')).toBeTruthy()

    // Test Home
    await container.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('scroll')).toBeTruthy()

    // Test End
    await container.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('scroll')).toBeTruthy()
  })

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener')
    wrapper.unmount()
    expect(removeEventListenerSpy).toHaveBeenCalled()
  })

  it('applies correct cursor styles during drag', async () => {
    const container = wrapper.find('.scroll-container')
    const element = container.element as HTMLElement

    // Initial state
    expect(element.style.cursor).toBe('grab')

    // During drag
    await container.trigger('mousedown', { pageY: 100 })
    expect(element.style.cursor).toBe('grabbing')

    // After drag
    await container.trigger('mouseup')
    expect(element.style.cursor).toBe('grab')
  })

  it('emits scroll events with correct position', async () => {
    const container = wrapper.find('.scroll-container')
    const element = container.element as HTMLElement
    const mockScrollTop = 100

    // Mock scrollTop
    Object.defineProperty(element, 'scrollTop', {
      get: () => mockScrollTop,
    })

    await container.trigger('scroll')
    expect(wrapper.emitted('scroll')).toBeTruthy()
    expect(wrapper.emitted('scroll')![0][0]).toBe(mockScrollTop)
  })
})
