"use strict";
const { Model } = require("sequelize");
const withPagination = require("sequelize-simple-pagination");

const HIDDEN_ATTRIBUTES = ["password"];

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        toJSON() {
            let attributes = Object.assign({}, this.get());
            for (let attribute of HIDDEN_ATTRIBUTES) {
                delete attributes[attribute];
            }
            return attributes;
        }

        static associate(models) {
            // define association here
        }
    }

    User.init(
        {
            name: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            telephone: DataTypes.STRING,
            img: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
        }
    );

    withPagination({
        methodName: "paginate",
        primaryKeyField: "id",
    })(User);

    return User;
};
