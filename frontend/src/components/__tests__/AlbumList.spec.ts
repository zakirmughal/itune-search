import {describe, it, expect, vi} from 'vitest'

import {shallowMount, mount} from '@vue/test-utils'
import AlbumList from '../AlbumList.vue'
import AlbumView from '../../views/AlbumView.vue'

describe('AlbumList', () => {
  const albumViewWrapper = shallowMount(AlbumView, {});
  it('search wrong album', async () => {
    const getAlbumRequestData = await albumViewWrapper.vm.fetchAlbums(320569549 + 'aaaaa');
    expect(albumViewWrapper.html()).toContain('Error: Invalid value(s) for key(s): [itunesId]');
    expect(getAlbumRequestData.success).toBe(undefined);
  })
  it('search justin Bieber album', async () => {
    const getAlbumRequestData = await albumViewWrapper.vm.fetchAlbums(320569549);
    expect(getAlbumRequestData.artistName).toEqual('Justin Bieber');
    const albumListWrapper = shallowMount(AlbumList, {
      props: {
        albums: getAlbumRequestData.albums,
        loading: false,
        error: ''
      }
    });
    expect(albumListWrapper.html()).toContain("<span class=\"font-bold text-lg\">50</span> album found.");
  })
});
