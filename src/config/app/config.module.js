"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppConfigModule = void 0;
var Joi = require("joi");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var configuration_1 = require("./configuration");
var config_service_1 = require("./config.service");
var AppConfigModule = /** @class */ (function () {
    function AppConfigModule() {
    }
    AppConfigModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [configuration_1["default"]],
                    validationSchema: Joi.object({
                        APP_RABBITMQ_USER: Joi.string().required(),
                        APP_RABBITMQ_PASSWORD: Joi.string().required(),
                        APP_RABBITMQ_HOST: Joi.string().required(),
                        APP_RABBITMQ_QUEUE_NAME: Joi.string().required()
                    })
                }),
            ],
            providers: [config_1.ConfigService, config_service_1.AppConfigService],
            exports: [config_service_1.AppConfigService]
        })
    ], AppConfigModule);
    return AppConfigModule;
}());
exports.AppConfigModule = AppConfigModule;
