"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ElasticsearchConfigService = void 0;
var common_1 = require("@nestjs/common");
var ElasticsearchConfigService = /** @class */ (function () {
    function ElasticsearchConfigService(configService) {
        this.configService = configService;
    }
    Object.defineProperty(ElasticsearchConfigService.prototype, "node", {
        get: function () {
            return this.configService.get('elasticsearch.node');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "authUsername", {
        get: function () {
            return this.configService.get('elasticsearch.authUsername');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "authPassword", {
        get: function () {
            return this.configService.get('elasticsearch.authPassword');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "maxRetries", {
        get: function () {
            return this.configService.get('elasticsearch.maxRetries');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "requestTimeout", {
        get: function () {
            return this.configService.get('elasticsearch.requestTimeout');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "pingTimeout", {
        get: function () {
            return this.configService.get('elasticsearch.pingTimeout');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "articlesIndex", {
        get: function () {
            return this.configService.get('elasticsearch.articlesIndex');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "hubsIndex", {
        get: function () {
            return this.configService.get('elasticsearch.hubsIndex');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ElasticsearchConfigService.prototype, "tagsIndex", {
        get: function () {
            return this.configService.get('elasticsearch.tagsIndex');
        },
        enumerable: false,
        configurable: true
    });
    ElasticsearchConfigService = __decorate([
        common_1.Injectable()
    ], ElasticsearchConfigService);
    return ElasticsearchConfigService;
}());
exports.ElasticsearchConfigService = ElasticsearchConfigService;
