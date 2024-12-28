const { dataSource } = require("../config/database");
const { User } = require("../models");

const userRepository = dataSource.getRepository(User);

module.exports = {userRepository};