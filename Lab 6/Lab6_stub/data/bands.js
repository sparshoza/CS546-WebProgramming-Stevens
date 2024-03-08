// This data file should export all functions using the ES6 standard as shown in the lecture code
import { ObjectId } from "mongodb";
import { bands } from "../config/mongoCollections.js";
export const create = async (
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
    throw ("Error: All fields must be provided.");
  }
  if (typeof name !== "string" || typeof website !== "string" || typeof recordCompany !== "string" ||
    name.trim() === "" || website.trim() === "" || recordCompany.trim() === "") {
    throw ("Error: Name, website, and recordCompany must be non-empty strings.");
  }
  if (typeof yearBandWasFormed !== "number" || yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear()) {
    throw ("Error: yearBandWasFormed must be a number between 1900 and the current year.");
  }
  if (!Array.isArray(genre) || genre.length === 0 || !genre.every(g => typeof g === "string" && g.trim() !== "")) {
    throw ("Error: genre must be a non-empty array of strings.");
  }
  if (!Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(m => typeof m === "string" && m.trim() !== "")) {
    throw ("Error: groupMembers must be a non-empty array of strings.");
  }
  if (!website.startsWith("http://www.") || !website.endsWith(".com") || website.length <= 18) {
    throw ("Error: website must start with 'http://www.' and end with '.com' and have at least 5 characters in-between.");
  }
  name = name.trim();
  genre = genre.map(g => g.trim()) //https://stackoverflow.com/questions/19293997/javascript-apply-trim-function-to-each-string-in-an-array
  website = website.trim();
  recordCompany = recordCompany.trim();
  groupMembers = groupMembers.map(gm => gm.trim());
  const band = {
    name:name,
    genre:genre,
    website:website,
    recordCompany:recordCompany,
    groupMembers:groupMembers,
    yearBandWasFormed:yearBandWasFormed,
    albums : [],
    overallRating: 0,
  };

  const bandsCollection = await bands();
  const result = await bandsCollection.insertOne(band);

  if (!result.acknowledged || !result.insertedId) {
    throw ('Error: Could not add post');
  }
  const newBand = await get(result.insertedId.toString());
  return newBand;
};

export const getAll = async () => {
  const bandsCollection = await bands();
  const allBands = await bandsCollection.find({}).toArray();
  for (let i of allBands) {
    i._id = i._id.toString();
  }
  if (!allBands) {
    throw ('Error: Could not get all posts')
  }
  return allBands;
};

export const get = async (id) => {
  if (!id) {
    throw ('Error: You must provide an id to search for');
  }
  if (typeof id !== 'string') {
    throw ('Error: Id must be a string')
  };
  if (id.trim().length === 0) {
    throw ('Error: id cannot be an empty string or just spaces');
  }
  if (!ObjectId.isValid(id)) {
    throw 'Error: invalid object ID';
  }
  id = id.trim();
  const bandsCollection = await bands();
  const band = await bandsCollection.findOne({ _id: new ObjectId(id) });
  if (!band) throw 'Error: No post with that id';
  band._id = band._id.toString();
  return band;
};

export const remove = async (id) => {
  if (!id) {
    throw ('Error: You must provide an id to search for');
  }
  if (typeof id !== 'string') {
    throw ('Error: Id must be a string')
  };
  if (id.trim().length === 0) {
    throw ('Error: id cannot be an empty string or just spaces');
  }
  if (!ObjectId.isValid(id)) {
    throw ('Error: invalid object ID');
  }
  const bandsCollection = await bands();
  const deleteMethod = await bandsCollection.findOneAndDelete({
    _id: new ObjectId(id)
  });
  id = id.trim();

  if (deleteMethod.lastErrorObject.n === 0) {
    throw (`Error: Could not delete post with id of ${id}`);
  }
  return `${deleteMethod.value.name} has been successfully deleted!`; //https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_04/dogs.js
};

export const update = async (
  id,
  name,
  genre,
  website,
  recordCompany,
  groupMembers,
  yearBandWasFormed
) => {
  if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) {
    throw ("Error: All fields must be provided.");
  }
  if (typeof name !== "string" || typeof website !== "string" || typeof recordCompany !== "string" ||
    name.trim() === "" || website.trim() === "" || recordCompany.trim() === "") {
    throw ("Error: Name, website, and recordCompany must be non-empty strings.");
  }
  if (typeof yearBandWasFormed !== "number" || yearBandWasFormed < 1900 || yearBandWasFormed > new Date().getFullYear()) {
    throw ("Error: yearBandWasFormed must be a number between 1900 and the current year.");
  }
  if (!Array.isArray(genre) || genre.length === 0 || !genre.every(g => typeof g === "string" && g.trim() !== "")) {
    throw ("Error: genre must be a non-empty array of strings.");
  }
  if (!Array.isArray(groupMembers) || groupMembers.length === 0 || !groupMembers.every(m => typeof m === "string" && m.trim() !== "")) {
    throw ("Error: groupMembers must be a non-empty array of strings.");
  }
  if (!website.startsWith("http://www.") || !website.endsWith(".com") || website.length <= 18) {
    throw ("Error: website must start with 'http://www.' and end with '.com' and have at least 5 characters in-between.");
  }
  name = name.trim();
  genre = genre.map(g => g.trim())
  website = website.trim();
  recordCompany = recordCompany.trim();
  groupMembers = groupMembers.map(gm => gm.trim());

  if (!ObjectId.isValid(id)) {
    throw ('Error: invalid object ID');
  }
  const bandsCollection = await bands();
  const objectId = new ObjectId(id);
  
  const existingBand = await bandsCollection.findOne({ _id: objectId });
  if (!existingBand) {
    throw ('Error: Band not found');
  }

  if (existingBand.name === name) {
    throw ('Error: New name cannot be the same as current name');
  }

  const updateResult = await bandsCollection.updateOne({ _id: objectId }, { $set: { name: name, genre:genre, website: website, recordCompany: recordCompany, groupMembers:groupMembers, yearBandWasFormed: yearBandWasFormed } });
  if (updateResult.modifiedCount === 0) { //https://stackoverflow.com/questions/63249714/mongodb-checking-if-insert-or-update-was-successfull-with-async-await
    throw ('Error: Failed to update band');
  }

  const updatedBand = await bandsCollection.findOne({ _id: objectId });

  return {
    _id: updatedBand._id.toString(),
    name: updatedBand.name,
    genre: updatedBand.genre,
    website: updatedBand.website.trim(),
    recordCompany: updatedBand.recordCompany.trim(),
    groupMembers: updatedBand.groupMembers,
    yearBandWasFormed: updatedBand.yearBandWasFormed
  };
};
