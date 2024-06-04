import axios from 'axios';
import {AlbumResponse, ArtistAlbum, ArtistAlbumResponse, GetArtistAlbumsResponse} from "./app.definition";

export const getAlbumsByArtistId = async ({params}): Promise<ArtistAlbumResponse | string> => {
  try {
    const {artistId} = params;
    if (!artistId) {
      throw new Error('Artist is missing')
    }
    const {data, status} = await axios.get<GetArtistAlbumsResponse>(
      `https://itunes.apple.com/lookup?id=${artistId}&entity=album`,
    );

    const response: AlbumResponse[] = [];
    const artistName = (data?.results || []).find((row: ArtistAlbum) => row.artistType === 'Artist')?.artistName;
    (data?.results || []).forEach((row: ArtistAlbum) => {
      if (row.collectionType === 'Album' && response.findIndex((a: AlbumResponse) => a.albumId === row.collectionId) === -1) {
        response.push({
          albumId: row.collectionId,
          albumName: row.collectionName,
          collectionPrice: row.collectionPrice,
          trackCount: row.trackCount,
          releaseDate: row.releaseDate,
          primaryGenreName: row.primaryGenreName,
          albumPic: row.artworkUrl60 ? row.artworkUrl60.slice(0, (row.artworkUrl60.lastIndexOf('/'))) + '/250x250bb.jpg' : null,
        });
      }
    });
    return {
      artistName,
      albums: response
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {;
      throw new Error(error.response.data.errorMessage)
    } else {
      return 'An unexpected error occurred';
    }
  }
}
