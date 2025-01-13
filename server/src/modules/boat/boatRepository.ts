import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
  tile_id?: number;
  type?: string;
  has_treasure?: boolean;
};

class BoatRepository {
  async readAll(where = {}) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
            b.id AS boat_id, 
            b.name, 
            b.coord_x, 
            b.coord_y, 
            t.id AS tile_id, 
            t.type AS tile_type, 
            t.has_treasure 
        FROM 
            boat b 
        LEFT JOIN 
            tile t 
        ON 
            b.coord_x = t.coord_x AND b.coord_y = t.coord_y 
        ORDER BY 
            b.coord_y, b.coord_x`,
    );

    return rows.map((row) => ({
      id: row.boat_id,
      name: row.name,
      coord_x: row.coord_x,
      coord_y: row.coord_y,
      tile_id: row.tile_id,
      type: row.tile_type,
      has_treasure: row.has_treasure,
    })) as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>): Promise<number> {
    const { id, coord_x, coord_y } = boatToUpdate;

    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [coord_x, coord_y, id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
