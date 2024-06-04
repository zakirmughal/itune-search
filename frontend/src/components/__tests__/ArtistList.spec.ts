import {describe, it, expect, vi} from 'vitest'

import {shallowMount, mount} from '@vue/test-utils'
import ArtistList from '../ArtistList.vue'
import ArtistView from '../../views/ArtistView.vue'

const artistViewWrapper = shallowMount(ArtistView);
let artistListWrapper = shallowMount(ArtistList, {
  props: {
    artists: [],
    loading: false,
    error: ''
  }
});

describe('ArtistList', () => {
  it('renders properly', () => {
    expect(artistListWrapper.html()).toContain("No Artist Found");
  })
  it('search justin & hit search', async () => {
    const getArtistRequestData = await artistViewWrapper.vm.getArtistRequest('justin');
    artistListWrapper = shallowMount(ArtistList, {
      props: {
        artists: getArtistRequestData,
        loading: false,
        error: ''
      }
    });
    expect(artistListWrapper.html()).toContain("<span class=\"font-bold text-lg\">30</span> artist found.");
  })
});
