// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import { Router } from 'express';
const router = Router();
import * as bandsjs from "../data/bands.js"
import { ObjectId } from 'mongodb';
router
  .route('/')
  .get(async (req, res) => {
    try {
      const bands = await bandsjs.getAll();
      const formattedBands = bands.map(band => ({
        _id: band._id,
        name: band.name
      }));
      res.json(formattedBands);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error 123 bands working' });
    }
  })
  .post(async (req, res) => {
    try {

      const { name, genre, website, recordCompany, groupMembers, yearBandWasFormed } = req.body;
      if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
        return res.status(400).json({ error: 'Error: All fields must be provided.' });
      }
      if (typeof name !== "string" || typeof website !== "string" || typeof recordCompany !== "string" ||
        name.trim() === "" || website.trim() === "" || recordCompany.trim() === "") {
        return res.status(400).json({ error: 'Error: Name, website, and recordCompany must be non-empty strings.' });
      }
      if (typeof yearBandWasFormed !== "number" || yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear()) {
        return res.status(400).json({ error: 'Error: yearBandWasFormed must be a number between 1900 and the current year.' });
      }
      if (!Array.isArray(genre) || genre.length === 0 || !genre.every(g => typeof g === "string" && g.trim() !== "")) {
        return res.status(400).json({ error: 'Error: genre must be a non-empty array of strings.' });
      }
      if (!Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(m => typeof m === "string" && m.trim() !== "")) {
        return res.status(400).json({ error: 'Error: groupMembers must be a non-empty array of strings.' });
      }
      if (!website.startsWith("http://www.") || !website.endsWith(".com") || website.length <= 18) {
        return res.status(400).json({ error: 'Error: website must start with http://www. and end with .com and have at least 5 characters in-between.' });
      }
      const newBand = await bandsjs.create(name.trim(), genre.map(g => g.trim()), website.trim(), recordCompany.trim(), groupMembers.map(m => m.trim()), yearBandWasFormed);
      res.status(200).json(newBand);
    } catch (err) {
      res.status(400).json({ message: err.message });

    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid band ID' });
      }

      const band = await bandsjs.get(id);

      if (!band) {
        return res.status(404).json({ error: 'Band not found' });
      }

      res.status(200).json(band);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const deletedBand = await bandsjs.remove(id);

    if (!deletedBand) {
      return res.status(404).json({ error: 'Band not found' });
    }

    return res.status(200).json({ bandId: id, deleted: true });
  })
  .put(async (req, res) => {
    try {
      const bandId = req.params.id;

      if (!ObjectId.isValid(bandId)) {
        return res.status(400).send({ message: 'Invalid band id.' });
      }

      const { name, genre, website, recordCompany, groupMembers, yearBandWasFormed } = req.body;
      if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
        return res.status(400).send({ message: 'All fields are required.' });
      }

      if (typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string' || !name.trim() || !website.trim() || !recordCompany.trim()) {
        return res.status(400).send({ message: 'Name, website, and record company must be valid strings.' });
      }

      if (!website.startsWith("http://www.") || !website.endsWith(".com") || website.length <= 18) {
        return res.status(400).send({ message: 'Website must be in the correct format: http://www.example.com' });
      }

      if (!Array.isArray(genre) || !genre.every(g => typeof g === 'string' && g.trim())|| !Array.isArray(groupMembers) || !groupMembers.every(gm => typeof gm === 'string' && gm.trim())) {
        return res.status(400).send({ message: 'Genre and group members must be arrays with at least one valid string element.' });
      }

      const year = Number(yearBandWasFormed);
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
        return res.status(400).send({ message: 'Year band was formed must be a valid number between 1900 and current year.' });
      }

      const existingBand = await bandsjs.get(bandId);
      if (!existingBand) {
        return res.status(404).send({ message: 'Band not found.' });
      }

      const updatedBand = {
        ...existingBand,
        name: name.trim(),
        genre: genre.filter(g => g.trim()),
        website: website.trim(),
        recordCompany: recordCompany.trim(),
        groupMembers: groupMembers.filter(gm => gm.trim()),
        yearBandWasFormed: year,
      };

      updatedBand.albums = existingBand.albums;

      await bandsjs.update(bandId, updatedBand.name, updatedBand.genre, updatedBand.website, updatedBand.recordCompany, updatedBand.groupMembers, updatedBand.yearBandWasFormed);

      res.status(200).send(updatedBand);

    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal server error.' });
    }
  });
export default router;
