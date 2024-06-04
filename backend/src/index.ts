import express, {Express, Request, Response} from 'express';
import {getAlbumArtists} from "./list-all-artists";
import {getAlbumsByArtistId} from "./get-all-album";

const router = express.Router();

router.route('/search/:term/:page').get(async (req: Request, res: Response) => {
  try {
    const data = await getAlbumArtists(req);
    res.status(200).send({success: true, data})
  } catch (e) {
    res.status(400).send({
      success: false,
      error: {
        code: 400,
        description: e.toString()
      }
    })
  }
});

router.route('/albums/:artistId').get(async (req: Request, res: Response) => {
  try {
    const data = await getAlbumsByArtistId(req);
    res.status(200).send({success: true, data})
  } catch (e) {
    res.status(400).send({
      success: false,
      error: {
        code: 400,
        description: e.toString()
      }
    })
  }
});
export default router;
