import express from "express";

import mapRouter from "./map/index.js";
import publishImageRouter from "./publish_image/index.js";
import messagesRouter from "./messages/index.js";

const examplesRouter = express.Router();

examplesRouter.use("/map", mapRouter);
examplesRouter.use("/publish_image", publishImageRouter);
examplesRouter.use("/messages", messagesRouter)
examplesRouter.get("/", (req, res) => {
    return res.render("examples/index");
});


export default examplesRouter;
