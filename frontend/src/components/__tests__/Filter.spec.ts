import {describe, it, expect, vi} from 'vitest'

import {shallowMount, mount} from '@vue/test-utils'
import Filter from '../Filter.vue'

const filterWrapper = shallowMount(Filter, {
  props: {
    getArtistRequest: () => {
    }
  }
})

describe('Filter', () => {
  /*
  const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
   */
  it('renders properly', () => {
    const searchButton = filterWrapper.find('#search-btn');
    const searchTextBox = filterWrapper.find('#search-txt');
    expect(searchButton.exists()).toBe(true);
    expect(searchTextBox.exists()).toBe(true);
  })
})
