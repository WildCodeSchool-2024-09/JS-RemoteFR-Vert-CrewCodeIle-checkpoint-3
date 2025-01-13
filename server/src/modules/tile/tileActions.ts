import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const validate: RequestHandler = async (req, res, next) => {
  try {
    const tiles = req.body;

    if (tiles.coord_x && tiles.coord_y) {
      res.sendStatus(204);
    } else {
      res.sendStatus(422);
    }

    const tilesCoordonates = await tileRepository.readByCoordinates(
      tiles.coordX,
      tiles.coordY,
    );
    next();
  } catch (err) {
    next(err);
  }
};

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();

    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
