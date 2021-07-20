"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppConfigService = void 0;
var common_1 = require("@nestjs/common");
var AppConfigService = /** @class */ (function () {
    function AppConfigService(configService) {
        this.configService = configService;
    }
    Object.defineProperty(AppConfigService.prototype, "rmqUser", {
        get: function () {
            return this.configService.get('app.rmqUser');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "rmqPassword", {
        get: function () {
            return this.configService.get('app.rmqPassword');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "rmqHost", {
        get: function () {
            return this.configService.get('app.rmqHost');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "rmqQueueName", {
        get: function () {
            return this.configService.get('app.rmqQueueName');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "rmqUrl", {
        get: function () {
            return "amqp://" + this.rmqUser + ":" + this.rmqPassword + "@" + this.rmqHost;
        },
        enumerable: false,
        configurable: true
    });
    AppConfigService = __decorate([
        common_1.Injectable()
    ], AppConfigService);
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;
