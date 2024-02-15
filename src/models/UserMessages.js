import { DataTypes } from "sequelize";

import db from "../config/db.js";
import User from "./User.js";

const UserMessages = db.define("user-messages", {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: "user-messages",
});

UserMessages.belongsTo(User);

export default UserMessages;
