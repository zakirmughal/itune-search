"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const list_all_artists_1 = require("./list-all-artists");
const get_all_album_1 = require("./get-all-album");
const router = express_1.default.Router();
router.route('/search/:term/:page').get(async (req, res) => {
    try {
        const data = await (0, list_all_artists_1.getAlbumArtists)(req);
        res.status(200).send({ success: true, data });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: {
                code: 400,
                description: e.toString()
            }
        });
    }
});
router.route('/albums/:artistId').get(async (req, res) => {
    try {
        const data = await (0, get_all_album_1.getAlbumsByArtistId)(req);
        res.status(200).send({ success: true, data });
    }
    catch (e) {
        res.status(400).send({
            success: false,
            error: {
                code: 400,
                description: e.toString()
            }
        });
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map