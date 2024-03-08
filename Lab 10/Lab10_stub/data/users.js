import { users } from "../config/mongoCollections.js";
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
export const createUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  const usersCollection = await users();
  if (!firstName || !lastName || !emailAddress || !password || !role) {
    throw ('All fields are required.');
  }
  if (!/^[a-zA-Z]+$/.test(firstName) || firstName.length < 2 || firstName.length > 25) {//https://regex-generator.olafneumann.org/
    throw ('Invalid firstName. It should only contain alphabets, and should be between 2 to 25 characters long.');
  }
  if (!/^[a-zA-Z]+$/.test(lastName) || lastName.length < 2 || lastName.length > 25) {//https://regex-generator.olafneumann.org/
    throw ('Invalid lastName. It should only contain alphabets, and should be between 2 to 25 characters long.');
  }
  if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(emailAddress)) {//https://regex-generator.olafneumann.org/
    throw ('Invalid email address.');
  }
  emailAddress = emailAddress.toLowerCase();
  const existingUser = usersCollection.findOne({ emailAddress });
  if (existingUser) {
    throw ('Email address is already registered.');
  }
  if (!/(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/.test(password) || password.length < 8) { //https://regex-generator.olafneumann.org/
    throw ('Invalid password. It should be at least 8 characters long and contain at least one uppercase letter, one number, and one special character.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  if (role.toLowerCase().trim() !== 'admin' && role.toLowerCase().trim() !== 'user') {
    throw ('Invalid role. Only "admin" or "user" are allowed.');
  }
  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.trim();
  role = role.trim();
  const newUser = {
    _id: new ObjectId(),
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hashedPassword,
    role: role
  }
  const result = await usersCollection.insertOne(newUser);
  if (!result.acknowledged || !result.insertedId) {
    throw ('Error: Could not add post');
  }
  else {
    return { insertedUser: true };
  }
};

export const checkUser = async (emailAddress, password) => {
  if (!emailAddress || !password) {
    throw ('Both emailAddress and password must be supplied');
  }

  const emailRegex =/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(emailAddress)) {
    throw ('Invalid email address');
  }

  emailAddress = emailAddress.toLowerCase();

  const passwordRegex = /(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d])/;
  if (!passwordRegex.test(password)) {
    throw ('Invalid password');
  }

  const usersCollection = await users();

  const user = await usersCollection.findOne({ emailAddress: emailAddress });

  if (!user) {
    throw ('Either the email address or password is invalid');
  }

  const checkIfUser = await bcrypt.compare(password, user.password);

  if (checkIfUser) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      role: user.role
    };
  }

  throw ('Either the email address or password is invalid');
};
