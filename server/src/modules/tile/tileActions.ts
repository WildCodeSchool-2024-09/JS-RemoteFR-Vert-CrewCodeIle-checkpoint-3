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
  const tileFromCoordinates = await tileRepository.readByCoordinates(
    req.body.coord_x,
    req.body.coord_y,
  );
  if (!tileFromCoordinates) {
    res.sendStatus(422);
  }
  if (
    req.body.coord_x < 0 ||
    req.body.coord_x > 11 ||
    req.body.coord_y < 0 ||
    req.body.coord_y > 5
  ) {
    res.sendStatus(422);
  }
  next();
};

export default {
  browse,
  validate,
};
