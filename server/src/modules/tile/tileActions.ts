import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";
import { ne } from "@faker-js/faker/.";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  type validationErrors = {
    field: string;
    message: string;
  };
  const errors: validationErrors[] = [];
  const { coord_x, coord_y } = req.body;
  const fullCoord = await tileRepository.readByCoordinates(coord_x, coord_y);
  if (fullCoord.length === 0) {
    res.sendStatus(422);
  }

  if (errors.length === 0) {
    next();
  } else {
    res.status(422);
  }
};

export default {
  browse,
  validate,
};
