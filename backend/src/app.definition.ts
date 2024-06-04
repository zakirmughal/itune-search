export type Artist = {
  artistId: number;
  artistName: string;
  artworkUrl60: string;
  collectionId: string
  collectionName: string;
};

export type ArtistResponse = {
  artistId: number;
  artistName: string;
  artworkUrl60: string;
  albumId: string
  albumName: string;
};

export type GetArtistsResponse = {
  resultCount: number,
  results: Artist[];
};


export type ArtistAlbum = {
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionType: string;
  trackCount: number
  releaseDate: Date;
  artistType: string;
  artworkUrl60: string;
  primaryGenreName: string;
  artistName?: string;
};

export type AlbumResponse = {
  albumId: number
  albumName: string;
  collectionPrice: number;
  trackCount: number
  releaseDate: Date;
  albumPic: string;
  primaryGenreName: string;
};

export type ArtistAlbumResponse = {
  albums: AlbumResponse[],
  artistName: string
};

export type GetArtistAlbumsResponse = {
  resultCount: number,
  results: ArtistAlbum[];
};
