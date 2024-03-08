import express from "express";

import { PropertyModel, CategoryModel, PriceModel } from "../../mappings/models/index.js";
import expand from "../../controllers/expand.js";
import { serverUrl } from "../../controllers/env/env.js";

const viewRoute = express.Router();

/**
 * View property by id
 */
viewRoute.get("/view/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // Fetch property
        const property = await PropertyModel().findByPk(id, {
            include: [{
                raw: true,
                model: CategoryModel(),
                as: "category"
            }, {
                raw: true,
                model: PriceModel(),
                as: "price"
            }]
        });
        
        // Check that the property exists
        if(!property) {
            console.log(`Property doesn't exists redirect to 404`);
            const page404 = `${serverUrl()}/404`;
            return res.redirect(page404);
        }
        
        return res.render("property/view", {
            property,
            ...expand(req)
        });
    } catch(err) {
        const home = `${serverUrl()}/home`;
        
        console.log(`Error when trying to view property`);
        console.error(err);
        console.log(`Redirect home`);
        return res.redirect(home);
    }
});

export default viewRoute;
