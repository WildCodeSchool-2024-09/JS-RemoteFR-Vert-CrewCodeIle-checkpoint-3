import type { RequestHandler } from "express";

import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// const edit: RequestHandler = async (req, res, next) => {
//   const boatId = Number.parseInt(req.params.id, 10);
//   const { coord_x, coord_y } = req.body;

//   if (!coord_x || !coord_y) {
//     return res.status(400).send("Coordonnées manquantes");
//   }

//   try {
//     const affectedRows = await boatRepository.update({
//       id: boatId,
//       coord_x,
//       coord_y,
//     });

//     if (affectedRows === 0) {
//       return res.sendStatus(404);
//     }

//     return res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// };

export default {
  browse,
  // edit,
};
