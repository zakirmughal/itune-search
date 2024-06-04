"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAlbumArtists = void 0;
const axios_1 = __importDefault(require("axios"));
const getAlbumArtists = async ({ params, query }) => {
    try {
        const { term, page } = params;
        const { limit } = query;
        if (!query) {
            throw new Error('Keyword is missing');
        }
        const { data, status } = await axios_1.default.get(`https://itunes.apple.com/search?term=${term}&media=music&attribute=artistTerm&limit=${limit || 200}&${page || 1}`);
        const response = [];
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
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            //console.log('unexpected error: ', error);
            throw new Error(error.message);
        }
        else {
            //console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
};
exports.getAlbumArtists = getAlbumArtists;
//# sourceMappingURL=list-all-artists.js.map