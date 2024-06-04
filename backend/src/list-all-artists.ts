import axios from 'axios';
import {ArtistResponse, GetArtistsResponse} from "./app.definition";

export const getAlbumArtists = async ({params, query}): Promise<ArtistResponse[] | string> => {
  try {
    const {term, page} = params;
    const {limit} = query
    if (!query) {
      throw new Error('Keyword is missing')
    }
    const {data, status} = await axios.get<GetArtistsResponse>(
      `https://itunes.apple.com/search?term=${term}&media=music&attribute=artistTerm&limit=${limit || 200}&${page || 1}`,
    );
    const response: ArtistResponse[] = [];
    (data?.results || []).forEach(row => {
      if (response.findIndex((a) => a.artistId === row.artistId) === -1) {
        response.push({
          artistId: row.artistId,
          artistName: row.artistName,
          artworkUrl60: row.artworkUrl60 ? row.artworkUrl60.slice(0, (row.artworkUrl60.lastIndexOf('/'))) + '/200x200bb.jpg' : null,
          albumId: row.collectionId,
          albumName: row.collectionName,
        });
      }
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //console.log('unexpected error: ', error);
      throw new Error(error.message)
    } else {
      //console.log('unexpected error: ', error);
      return 'An unexpected error occurred';
    }
  }
}
