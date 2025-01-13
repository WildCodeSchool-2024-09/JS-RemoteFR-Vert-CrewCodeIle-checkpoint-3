import type { RequestHandler } from "express";
import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (err) {
    next(err);
  }
};

// const validate: RequestHandler = async (req, res, next) => {
//   const { coord_x, coord_y } = req.body;

//   if (coord_x === undefined || coord_y === undefined) {
//     return res.status(422).send("Coordonnées manquantes");
//   }

//   if (coord_x < 0 || coord_x > 11 || coord_y < 0 || coord_y > 5) {
//     return res.status(422).send("Coordonnées invalides");
//   }

//   const tile = await tileRepository.readByCoordinates(coord_x, coord_y);
//   if (!tile) {
//     return res.status(422).send("La tuile n'existe pas");
//   }

//   next();
// };

export default {
  browse,
  // validate,
};
