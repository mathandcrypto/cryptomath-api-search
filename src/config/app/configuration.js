"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = config_1.registerAs('app', function () { return ({
    rmqUser: process.env.APP_RABBITMQ_USER,
    rmqPassword: process.env.APP_RABBITMQ_PASSWORD,
    rmqHost: process.env.APP_RABBITMQ_HOST,
    rmqQueueName: process.env.APP_RABBITMQ_QUEUE_NAME
}); });
