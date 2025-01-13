import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  // your code here
  try {
    const tilesFromDataBase = await tileRepository.readAll();

    res.json(tilesFromDataBase);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  const { coord_x, coord_y } = req.body;
  if (typeof coord_x !== "number" || typeof coord_y !== "number") {
    res.sendStatus(422).json({
      validationErrors: [
        { fiel1d: "coord_y", message: "coordonnée y invalide" },
        { field: "coord_x", message: "coordonnée x invalide" },
      ],
    });
    return;
  }

  try {
    const validTile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (validTile.length === 0) {
      res.sendStatus(422).json(
        res.json({
          validationErrors: [
            { field: "coordonnées", message: "coordonnée invalide" },
          ],
        }),
      );
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  validate,
};
