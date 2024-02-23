import dotenv from "dotenv";

// Setup dotenv
dotenv.config({
    path: ".env"
});

import { DataTypes } from "sequelize";

import { MSQLDC_FetchENV, User } from "express-authentication";

// console.log(`[On Import declaration] Property model`);

const Property = MSQLDC_FetchENV().define("property", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parking: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    latitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    longitude: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: "property",
});

Property.belongsTo(User);

export default Property;
