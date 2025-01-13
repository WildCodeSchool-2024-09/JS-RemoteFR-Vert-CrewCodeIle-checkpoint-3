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

const edit: RequestHandler = async (req, res, next) => {
  const newBoat = {
    id: Number.parseInt(req.params.id),
    coord_x: Number.parseInt(req.params.coord_x),
    coord_y: Number.parseInt(req.params.coord_y),
  };

  try {
    const boatToUpdate: number = await boatRepository.update(newBoat);

    if (boatToUpdate > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  edit,
};
