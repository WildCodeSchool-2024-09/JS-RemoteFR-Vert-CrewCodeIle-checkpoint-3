import type { NextFunction, RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tile = await tileRepository.readAll();

    res.json(tile);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;

  if (typeof coord_x !== "number" || typeof coord_y !== "number") {
    res.sendStatus(422).json({
      validationErrors: [
        { field: "coord_x", message: "La coordonnée de X est fausse " },
        { field: "coord_y", message: "La coordonnée de Y est fausse" },
      ],
    });
    return;
  }

  try {
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile.length > 0) {
      next();
    } else {
      res.sendStatus(422).json({
        validationErrors: [
          {
            field: "coord_x and coord_y",
            message: "Les coordonnées sont fausses",
          },
        ],
      });
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
