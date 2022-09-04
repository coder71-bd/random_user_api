import fs from "fs/promises";
import path from "path";
import { getRandomNumber } from "../utilities/utilities.js";

const userDb = path.resolve("db.json");

// get random user
export const getRandomUser = async (req, res) => {
  try {
    const TextData = await fs.readFile(userDb, { encoding: "utf-8" });
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
    const TextData = await fs.readFile(userDb, { encoding: "utf-8" });
    const data = JSON.parse(TextData);
    if (limit) data.length = limit;
    res.json(data);
  } catch (error) {
    console.log(error.message);
  }
};

// get all user
export const saveUser = async (req, res) => {
  try {
    const TextData = await fs.readFile(userDb, { encoding: "utf-8" });
    const data = JSON.parse(TextData);
    let user = req.body;
    user = {
      Id: data.length + 1,
      ...user,
    };
    data.push(user);
    await fs.writeFile(userDb, JSON.stringify(data));
    res.json({
      message: "user saved successfully!",
      data: user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const updateAnUser = async (dbData, updateInfo) => {
  const updatedUserData = dbData.map((user) => {
    if (user.Id === updateInfo.Id) {
      return {
        ...user,
        ...updateInfo,
      };
    }
    return user;
  });

  await fs.writeFile(userDb, JSON.stringify(updatedUserData));

  return updatedUserData;
};

// update a user
export const updateUser = async (req, res) => {
  try {
    const TextData = await fs.readFile(userDb, { encoding: "utf-8" });
    const data = JSON.parse(TextData);
    const updateInfo = req.body;

    if (typeof parseInt(updateInfo.Id) !== "number" || isNaN(updateInfo.Id)) {
      res.json({
        message: "user Id should be a number",
      });
    }

    const userExist = data.find((user) => user.Id === updateInfo.Id);

    if (!userExist) {
      res.json({
        message: "User doesn't exist with the provided Id",
      });
    }

    const updatedUserData = await updateAnUser(data, updateInfo);

    const updatedUser = updatedUserData.find(
      (user) => user.Id === updateInfo.Id
    );

    res.json({
      message: "user uddated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// bulk update users
export const bulkUpdateUser = async (req, res) => {
  try {
    const TextData = await fs.readFile(userDb, { encoding: "utf-8" });
    const data = JSON.parse(TextData);
    const usersUpdateInfo = req.body;

    for (let i = 0; i < usersUpdateInfo; i++) {
      const updateInfo = usersUpdateInfo[i];
      if (typeof userId !== "number" || isNaN(updateInfo.Id)) {
        res.json({
          message: "user Id should be a number",
        });
        return;
      }

      const userExist = data.find((user) => user.Id === updateInfo.Id);

      if (!userExist) {
        res.json({
          message: "User doesn't exist with the provided Id",
        });
        return;
      }

      await updateAnUser(data, updateInfo);
    }

    res.json({
      message: "user bulk uddated successfully!",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const TextData = await fs.readFile(userDb, { encoding: "utf-8" });
    const data = JSON.parse(TextData);
    const updateInfo = req.body;

    if (typeof parseInt(updateInfo.Id) !== "number" || isNaN(updateInfo.Id)) {
      res.json({
        message: "user Id should be a number",
      });
    }

    const userExist = data.find((user) => user.Id === updateInfo.Id);

    if (!userExist) {
      res.json({
        message: "User doesn't exist with the provided Id",
      });
    }

    const dataAfterDeletingUser = data.filter(
      (user) => user.Id !== updateInfo.Id
    );

    await fs.writeFile(userDb, JSON.stringify(dataAfterDeletingUser));

    res.json({
      message: "user uddated successfully!",
      data: userExist,
    });
  } catch (error) {
    console.log(error.message);
  }
};
