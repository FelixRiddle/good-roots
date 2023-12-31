import express from "express";

import expand from "../controllers/expand.js"

const homeRouter = express.Router();

const renderHome = (req, res) => {
    console.log(`Get /home`);
    console.log(`Rendering home!`);
    
    let expanded = expand(req);
    console.log(`Data: `, expanded);
    console.log(`Rendering /home`);
    return res.render(
        "home", {
            ...expanded
        }
    );
};

homeRouter.get("/home", renderHome);
homeRouter.get("/", renderHome);

export default homeRouter;
