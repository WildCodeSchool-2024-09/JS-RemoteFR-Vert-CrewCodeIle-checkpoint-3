import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tileFromDataBase = await tileRepository.readAll();

    res.json(tileFromDataBase);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
};

export default {
  browse,
  validate,
};
