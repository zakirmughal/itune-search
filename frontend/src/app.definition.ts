export type Artist = {
  artistId: number;
  artistName: string;
  artworkUrl60: string;
  albumId: string
  albumName: string;
}

export type Artists = {
  success: boolean,
  data: Artist[]
};

export type Album = {
  albumId: number
  albumName: string;
  collectionPrice: number;
  trackCount: number
  releaseDate: Date;
  albumPic: string;
  primaryGenreName: string;
};

export type Albums = {
  success: boolean,
  data: {
    albums: Album[],
    artistName: string
  }
};
