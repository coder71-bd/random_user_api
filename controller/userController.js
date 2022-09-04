import fs from "fs/promises";
import path from "path";
import { getRandomNumber } from "../utilities/utilities.js";

const userDb = path.resolve("db.json");

// get random user
export const getRandomUser = async (req, res) => {
  try {
    const TextData = await fs.readFile(userDb, { encoding: "utf-8", flag: "" });
    const data = JSON.parse(TextData);
    const randomNum = getRandomNumber(1, data.length);
    const randomUser = data.find((d) => d.Id === randomNum);
    res.json(randomUser);
  } catch (error) {
    console.log(error.message);
  }
};

// get all user
export const getAllUser = async (req, res) => {
  try {
    const { limit } = req.query;
    const TextData = await fs.readFile(userDb, { encoding: "utf-8", flag: "" });
    const data = JSON.parse(TextData);
    if (limit) data.length = limit;
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
};
