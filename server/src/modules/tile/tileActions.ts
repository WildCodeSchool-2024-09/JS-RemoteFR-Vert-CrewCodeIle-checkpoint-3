import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tilesFromDB = await tileRepository.readAll();
    res.json(tilesFromDB);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  // your code here
  const coordonnees = {
    coord_x: req.body.coord_x,
    coord_y: req.body.coord_y,
  };
  if (
    typeof coordonnees.coord_x !== "number" ||
    typeof coordonnees.coord_y !== "number"
  ) {
    res.sendStatus(422);
    return;
  }

  try {
    const affectedRows = await tileRepository.readByCoordinates(
      coordonnees.coord_x,
      coordonnees.coord_y,
    );

    if (affectedRows.length > 0) {
      next();
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
