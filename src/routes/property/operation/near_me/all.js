import express from "express";

import { Property } from "app-models";

const allRoutes = express.Router();

allRoutes.post("/all", async (req, res) => {
    console.log(`POST /property/operation/near_me/all`);
    
    try {
        // Find near the latitude and longitude of the user
        const { latitude, longitude } = req.body;
        const distance = 1;
        
        const haversine = `(
            6371 * acos(
                cos(radians(${latitude}))
                * cos(radians(latitude))
                * cos(radians(longitude) - radians(${longitude}))
                + sin(radians(${latitude})) * sin(radians(latitude))
            )
        )`;
        
        const propModel = new Property();
        const properties = await propModel.findAll({
            attributes: [
                'id',
                [sequelize.literal(haversine), 'distance'],
            ],
            where: {
                published: true,
            },
            order: sequelize.col('distance'),
            having: sequelize.literal(`distance <= ${distance}`),
            include: [{
                raw: true,
                model: Price,
                as: "price"
            }, {
                raw: true,
                model: Category,
                as: "category"
            }]
        });
        
        return res.send({
            properties,
        });
    } catch(err) {
        console.error(err);
        return res.send({
            messages: [{
                message: "Unknown error",
                error: true,
            }]
        })
    }
});

export default allRoutes;
