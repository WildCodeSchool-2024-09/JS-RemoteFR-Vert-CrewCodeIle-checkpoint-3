import express from "express";

const router = express.Router();
import boatActions from "./modules/boat/boatActions";
/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
import tileActions from "./modules/tile/tileActions";

router.get("/api/boats", boatActions.browse);
router.put("/api/boats/:id", tileActions.validate);
router.put("/api/boats/:id", boatActions.edit);

import gameActions from "./modules/game/gameActions";

router.post("/api/games", gameActions.add);
router.get("/api/tiles", tileActions.browse);
/* ************************************************************************* */

export default router;
