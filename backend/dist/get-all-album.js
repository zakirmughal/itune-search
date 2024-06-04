"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbumsByArtistId = void 0;
const axios_1 = __importDefault(require("axios"));
const getAlbumsByArtistId = async ({ params }) => {
    try {
        const { artistId } = params;
        if (!artistId) {
            throw new Error('Artist is missing');
        }
        const { data, status } = await axios_1.default.get(`https://itunes.apple.com/lookup?id=${artistId}&entity=album`);
        const response = [];
        const artistName = (data?.results || []).find((row) => row.artistType === 'Artist')?.artistName;
        (data?.results || []).forEach((row) => {
            if (row.collectionType === 'Album' && response.findIndex((a) => a.albumId === row.collectionId) === -1) {
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            ;
            throw new Error(error.response.data.errorMessage);
        }
        else {
            return 'An unexpected error occurred';
        }
    }
};
exports.getAlbumsByArtistId = getAlbumsByArtistId;
//# sourceMappingURL=get-all-album.js.map