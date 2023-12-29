import express from "express";

import addImageRouter from "./add_image.js";
import addImagePreflightRouter from "./add_image_preflight.js";
import getAllRouter from "./get_all.js";

const imagesRouter = express.Router();

imagesRouter.use(addImagePreflightRouter);
imagesRouter.use(addImageRouter);
imagesRouter.use(getAllRouter);

export default imagesRouter;
