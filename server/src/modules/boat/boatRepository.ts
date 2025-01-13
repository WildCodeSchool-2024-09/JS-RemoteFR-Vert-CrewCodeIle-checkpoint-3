import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

class BoatRepository {
  async readAll(where = {}) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      "SELECT boat.id, boat.coord_x, boat.coord_y, boat.name,tile.id, tile.coord_y, tile.coord_x, tile.type, tile.has_treasure FROM tile JOIN boat ON boat.id = tile.id WHERE boat.coord_y = boat.coord_y AND boat.coord_x = boat.coord_x ",
    );
    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET name = ?, coord_x = ?, coord_y = ? WHERE id = ?",
      [
        boatToUpdate.name,
        boatToUpdate.coord_x,
        boatToUpdate.coord_y,
        boatToUpdate.id,
      ],
    );
    return result.affectedRows;
  }
}

export default new BoatRepository();
