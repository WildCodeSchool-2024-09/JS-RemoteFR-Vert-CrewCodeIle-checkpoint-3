import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];
  const { coord_x, coord_y } = req.body;

  if (errors.length === 0) {
    res.sendStatus(422);
  }
  next();
};

export default {
  browse,
  validate,
};
