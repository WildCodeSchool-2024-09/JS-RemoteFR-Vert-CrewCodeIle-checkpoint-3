import type { RequestHandler } from "express";
import Joi from "joi";
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
  try {
    const boat = {
      id: Number(req.params.id),
      name: req.body.name,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };
    const affectedRows: number = await boatRepository.update(boat);

    if (affectedRows === 0) {
      res.status(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const boatSchema = Joi.object({
  name: Joi.string().required,
  coord_x: Joi.number(),
  coord_Y: Joi.number(),
});
const validate: RequestHandler = (req, res, next) => {
  const { error } = boatSchema.validate(req.body);
  if (error === null) {
    next();
  } else {
    res.sendStatus(400).json({ validationErrors: error?.details });
  }
};

export default {
  browse,
  edit,
  validate,
};
