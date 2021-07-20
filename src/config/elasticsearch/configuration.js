"use strict";
exports.__esModule = true;
var config_1 = require("@nestjs/config");
exports["default"] = config_1.registerAs('elasticsearch', function () { return ({
    node: process.env.ELASTICSEARCH_NODE,
    authUsername: process.env.ELASTICSEARCH_AUTH_USERNAME,
    authPassword: process.env.ELASTICSEARCH_AUTH_PASSWORD,
    maxRetries: process.env.ELASTICSEARCH_MAX_RETRIES,
    requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT,
    pingTimeout: process.env.ELASTICSEARCH_PING_TIMEOUT,
    articlesIndex: process.env.ELASTICSEARCH_ARTICLES_INDEX,
    hubsIndex: process.env.ELASTICSEARCH_HUBS_INDEX,
    tagsIndex: process.env.ELASTICSEARCH_TAGS_INDEX
}); });
