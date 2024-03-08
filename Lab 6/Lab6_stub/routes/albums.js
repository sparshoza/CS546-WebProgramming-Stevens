// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import * as albumsjs from "../data/albums.js"
import * as bandsjs from "../data/bands.js"
import { ObjectId } from 'mongodb';
router
  .route('/:bandId')
  .get(async (req, res) => {
    try {
      const bandId = req.params.bandId;

      if (!ObjectId.isValid(bandId)) {
        return res.status(400).json({ error: 'Invalid bandId' });
      }

      const albums = await albumsjs.getAll(bandId);
      res.status(200).json(albums);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  })
  .post(async (req, res) => {
    const { bandId } = req.params;
    const { title, releaseDate, tracks, rating } = req.body;

    if (!title || !releaseDate || !tracks) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (
      typeof title !== 'string' ||
      typeof releaseDate !== 'string' ||
      !Array.isArray(tracks) ||
      (rating !== undefined && typeof rating !== 'number')
    ) {
      return res.status(400).json({ message: 'Invalid input types' });
    }

    // Check if bandId is a valid ObjectId
    if (!ObjectId.isValid(bandId)) {
      return res.status(400).json({ message: 'Invalid bandId' });
    }

    try {
      const band = await bandsjs.get(bandId);

      // Check if band exists
      if (!band) {
        return res.status(404).json({ message: 'Band not found' });
      }

      // Check if tracks array has at least 3 elements
      if (tracks.length < 3 || !tracks.every((track) => typeof track === 'string')) {
        return res.status(400).json({ message: 'Invalid tracks' });
      }

      // Check if releaseDate is a valid date string
      const releaseDateObj = new Date(releaseDate);
      if (isNaN(releaseDateObj.getTime())) {
        return res.status(400).json({ message: 'Invalid releaseDate' });
      }

      // Check if releaseDate is between 1900 and current year + 1 year
      const currentYear = new Date().getFullYear();
      if (releaseDateObj.getFullYear() < 1900 || releaseDateObj.getFullYear() > currentYear + 1) {
        return res.status(400).json({ message: 'Invalid releaseDate range' });
      }

      // Check if rating is between 1 and 5
      if (rating !== undefined && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: 'Invalid rating' });
      }

      // Create new album sub-document and add to band's albums array
      const nalbum = { _id: new ObjectId(),
        title:title, 
        releaseDate:releaseDate, 
        tracks:tracks, 
        rating:rating 
      };
      const newalbum = await albumsjs.create(bandId, nalbum.title, nalbum.releaseDate, nalbum.tracks, nalbum.rating)

      // Return all band data with updated albums
      return res.status(200).json(newalbum);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  });

  router
  .route('/album/:albumId')
  .get(async (req, res) => {
    const { albumId } = req.params;

    try {
      if (!ObjectId.isValid(albumId)) {
        return res.status(400).json({ error: 'Invalid album ID.' });
      }

      const album = await albumsjs.get(albumId)

      // if (!album) {
      //   return res.status(404).json({ error: 'Album not found.' });
      // }

      return res.status(200).json(album);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  })
  .delete(async (req, res) => {
    const { albumId } = req.params;

    try {
      if (!ObjectId.isValid(albumId)) {
        return res.status(400).json({ error: 'Invalid album ID.' });
      }

      const album = await albumsjs.get(albumId);

      if (!album) {
        return res.status(404).json({ error: 'Album not found.' });
      }

      await albumsjs.remove(albumId);

      const band = await bandsjs.get(album.bandId);
      const albums = await albumsjs.find({ bandId: album.bandId });

      if (albums.length === 0) {
        band.overallRating = null;
      } else {
        const totalRating = albums.reduce((sum, album) => sum + album.rating, 0);
        band.overallRating = parseFloat((totalRating / albums.length).toFixed(1));
      }

      await band.save();

      return res.status(200).json({ albumId, deleted: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  });

export default router;
