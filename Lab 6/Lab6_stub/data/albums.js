// This data file should export all functions using the ES6 standard as shown in the lecture code

import { ObjectId } from 'mongodb';
import * as bandsjs from "./bands.js"
import { bands } from "../config/mongoCollections.js";

export const create = async (
  bandId,
  title,
  releaseDate,
  tracks,
  rating
) => {
  if (!bandId || !title || !releaseDate || !tracks || !rating) {
    throw ("Error: All fields must be provided.");
  }
  if (typeof bandId !== 'string' || bandId.trim() === "" || typeof title !== 'string' || title.trim() === "" || typeof releaseDate !== 'string' || releaseDate.trim() === "") {
    throw new Error('Invalid bandId, title, or releaseDate');
  }
  if (!ObjectId.isValid(bandId)) {
    throw new Error('Invalid bandId');
  }
  const bandsCollection = await bands();

  const band = await bandsjs.get(bandId);

  if (!Array.isArray(tracks) || tracks.length < 3 || !tracks.every(track => typeof track === 'string' && track.trim())) //https://stackoverflow.com/questions/26871106/check-if-all-elements-in-array-are-strings
  {
    throw new Error('Invalid tracks');
  }

  const date = new Date(releaseDate); //check for errors : TODO
  if (isNaN(date.getTime())) {
    throw new Error('Invalid releaseDate');
  }

  const currentYear = new Date().getFullYear();
  if (date.getFullYear() < 1900 || date.getFullYear() > currentYear + 1) {
    throw new Error('Invalid releaseDate');
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 5 || Number(rating.toFixed(1)) !== rating) {
    throw new Error('Invalid rating');
  }

  const album = {
    _id: new ObjectId(),
    title: title,
    releaseDate: releaseDate,
    tracks: tracks,
    rating: rating,
  };
  band.albums.push(album);
  let albumlength = band.albums.length;
  let currentrating = band.overallRating;
  let newrating = ((currentrating * (albumlength - 1)) + rating) / albumlength

  const newBand = await bandsCollection.updateOne({ _id: new ObjectId(bandId) }, { $set: { albums: band.albums, overallRating: newrating } });

  return album;
};

export const getAll = async (bandId) => {
  if (!bandId || typeof bandId !== 'string' || bandId.trim() === "") {
    throw new Error('Invalid bandId');
  }

  if (!ObjectId.isValid(bandId)) {
    throw new Error('Invalid bandId');
  }

  const band = await bandsjs.get(bandId);
  if (!band) {
    throw new Error(`Band with id ${bandId} not found`);
  }

  const albums = band.albums;

  return albums;
};

export const get = async (albumId) => {
  if (!albumId || typeof albumId !== 'string' || albumId.trim() === "") {
    throw new Error('Invalid albumId');
  }

  if (!ObjectId.isValid(albumId)) {
    throw new Error('Invalid albumId');
  }
  const bandCollection = await bands();
  const bandinfo = await bandCollection.findOne({ albums: { $elemMatch: { _id: new ObjectId(albumId) } } }); //https://stackoverflow.com/questions/5735311/mongodb-query-help-elemmatch-in-nested-objects
  const albuminfo = await getAll(bandinfo._id.toString());
  return albuminfo.find((x)=>{return x._id.toString() === albumId});
};

export const remove = async (albumId) => {
  if (!albumId || typeof albumId !== 'string' || albumId.trim() === "") {
    throw new Error('Invalid albumId');
  }

  if (!ObjectId.isValid(albumId)) {
    throw new Error('Invalid albumId');
  }

  const bandsCollection = await bands();
  const bandinfo = await bandsCollection.findOne({ albums: { $elemMatch: { _id: new ObjectId(albumId) } } }); //https://stackoverflow.com/questions/5735311/mongodb-query-help-elemmatch-in-nested-objects
  const deleteMethod = await bandinfo.findOneAndDelete({
    _id: new ObjectId(id)
  });
  id = id.trim();

  if (deleteMethod.lastErrorObject.n === 0) {
    throw (`Error: Could not delete post with id of ${id}`);
  }
  return `${deleteMethod.value.name} has been successfully deleted!`; //https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
 };
