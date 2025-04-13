import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseTable from '../common/BaseTable.vue'

describe('BaseTable', () => {
  const mockHeaders = ['Name', 'Age', 'Location']
  const mockRows = [
    { name: 'John', age: 30, location: 'New York' },
    { name: 'Jane', age: 25, location: 'London' },
  ]

  it('renders properly with headers and rows', () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: mockHeaders,
        rows: mockRows,
      },
      slots: {
        default: '<td>Test Cell</td>',
      },
    })

    expect(wrapper.findAll('th')).toHaveLength(mockHeaders.length)
    expect(wrapper.findAll('tr')).toHaveLength(mockRows.length + 1) // +1 for header row
    mockHeaders.forEach((header, index) => {
      expect(wrapper.findAll('th')[index].text()).toBe(header)
    })
  })

  it('applies striped class when striped prop is true', () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: mockHeaders,
        rows: mockRows,
        striped: true,
      },
    })

    expect(wrapper.classes()).toContain('base-table--striped')
  })

  it('emits row-click event when row is clicked', async () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: mockHeaders,
        rows: mockRows,
      },
    })

    await wrapper.findAll('tbody tr')[0].trigger('click')
    expect(wrapper.emitted('row-click')).toBeTruthy()
    expect(wrapper.emitted('row-click')?.[0]).toEqual([0, mockRows[0]])
  })

  it('emits row-mouseenter and row-mouseleave events', async () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: mockHeaders,
        rows: mockRows,
      },
    })

    const row = wrapper.findAll('tbody tr')[0]
    await row.trigger('mouseenter')
    expect(wrapper.emitted('row-mouseenter')).toBeTruthy()
    expect(wrapper.emitted('row-mouseenter')?.[0]).toEqual([0, mockRows[0]])

    await row.trigger('mouseleave')
    expect(wrapper.emitted('row-mouseleave')).toBeTruthy()
    expect(wrapper.emitted('row-mouseleave')?.[0]).toEqual([0, mockRows[0]])
  })

  it('handles row selection when selectable is true', async () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: mockHeaders,
        rows: mockRows,
        selectable: true,
      },
    })

    const row = wrapper.findAll('tbody tr')[0]
    await row.trigger('click')
    expect(wrapper.emitted('row-select')).toBeTruthy()
    expect(wrapper.emitted('row-select')?.[0]).toEqual([0, mockRows[0]])
    expect(row.classes()).toContain('base-table__row--selected')

    await row.trigger('click')
    expect(row.classes()).not.toContain('base-table__row--selected')
  })

  it('applies hoverable class when hoverable prop is true', () => {
    const wrapper = mount(BaseTable, {
      props: {
        headers: mockHeaders,
        rows: mockRows,
        hoverable: true,
      },
    })

    const row = wrapper.findAll('tbody tr')[0]
    expect(row.classes()).toContain('base-table__row--hoverable')
  })
})
