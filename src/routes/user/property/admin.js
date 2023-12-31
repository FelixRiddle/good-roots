import express from "express";

import Property from "../../../models/Property.js";
import Category from "../../../models/Category.js";
import Price from "../../../models/Price.js";
import expand from "../../../controllers/expand.js";
import { relativePropertyImages } from "../../../lib/user/userFolder/property/propertyFolder.js";

const adminRoutes = express.Router();

const admin = async(req, res) => {
    try {
        const { id: userId } = req.user;
        console.log(`User ID: ${userId}`);
        
        // Fetch properties from the database that are owned by this user
        const propertiesRes = await Property.findAll({
            where: {
                userId,
            },
            include: [
                {
                    raw: true,
                    model: Category,
                    as: 'category'
                }, {
                    raw: true,
                    model: Price,
                    as: "price"
                }
            ]
        });
        
        // Thanks sensei for this incredible response
        // https://stackoverflow.com/questions/64546830/sequelize-how-to-eager-load-with-associations-raw-true
        const properties = propertiesRes.map(x => x.get({ plain: true }));
        
        try {
            // Get property images
            for(let property of properties) {
                // Get the property images relative to the public path
                let propertyImages = relativePropertyImages(userId, property.id);
                
                property.imagesRelativeURI = propertyImages;
            }
        } catch(err) {
            // console.log(`Error:`)
            // console.error(err);
            // console.log(`The property folder for the user may not exist!`);
            // console.log(`This just means that the user doesn't have any properties`);
        }
        
        let expanded = expand(req);
        return res.render("user/property/admin", {
            page: "My Properties",
            properties,
            ...expanded,
        });
    } catch(err) {
        console.error(err);
        return res.render("home", {
            page: "Home",
        });
    }
}

// All of this go to the same page
adminRoutes.get("/myProperties", admin);
adminRoutes.get("/admin", admin);
adminRoutes.get("/index", admin);

export default adminRoutes;
