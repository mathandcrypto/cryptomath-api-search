"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ElasticsearchConfigModule = void 0;
var Joi = require("joi");
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var configuration_1 = require("./configuration");
var config_service_1 = require("./config.service");
var ElasticsearchConfigModule = /** @class */ (function () {
    function ElasticsearchConfigModule() {
    }
    ElasticsearchConfigModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [configuration_1["default"]],
                    validationSchema: Joi.object({
                        ELASTICSEARCH_NODE: Joi.string().required(),
                        ELASTICSEARCH_AUTH_USERNAME: Joi.string().required(),
                        ELASTICSEARCH_AUTH_PASSWORD: Joi.string().required(),
                        ELASTICSEARCH_MAX_RETRIES: Joi.number()["default"](3),
                        ELASTICSEARCH_REQUEST_TIMEOUT: Joi.number()["default"](10000),
                        ELASTICSEARCH_PING_TIMEOUT: Joi.number()["default"](3000),
                        ELASTICSEARCH_ARTICLES_INDEX: Joi.string().required(),
                        ELASTICSEARCH_HUBS_INDEX: Joi.string().required(),
                        ELASTICSEARCH_TAGS_INDEX: Joi.string().required()
                    })
                }),
            ],
            providers: [config_1.ConfigService, config_service_1.ElasticsearchConfigService],
            exports: [config_1.ConfigService, config_service_1.ElasticsearchConfigService]
        })
    ], ElasticsearchConfigModule);
    return ElasticsearchConfigModule;
}());
exports.ElasticsearchConfigModule = ElasticsearchConfigModule;
