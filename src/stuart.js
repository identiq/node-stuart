"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const axios_1 = require("axios");
const querystring_1 = require("querystring");
class Stuart {
    constructor(settings) {
        if (!settings.client_id) {
            throw new Error('API Client Id missing');
        }
        if (!settings.client_secret) {
            throw new Error('API Client Secret missing');
        }
        this.content_type = 'application/x-www-form-urlencoded';
        this.api_scope = 'api';
        this.api_grant = 'client_credentials';
        this.api_url = settings.api_url;
        this.client_id = settings.client_id;
        this.client_secret = settings.client_secret;
    }
    authenticate(client_id, client_secret) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post(`${this.api_url}/oauth/token`, {
                client_id: client_id,
                client_secret: client_secret,
                scope: this.api_scope,
                grant_type: this.api_grant
            }, {
                headers: {
                    'content-type': this.content_type
                },
                transformRequest: [(data) => querystring_1.default.stringify(data)]
            });
            this.bearer = response.data.access_token;
        });
    }
    createJob(job) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.authenticate(this.client_id, this.client_secret);
            return yield axios_1.default.post(`${this.api_url}/client/jobs`, {
                job: job
            }, {
                headers: {
                    'Authorization': `Bearer ${this.bearer}`
                }
            });
        });
    }
}
exports.default = Stuart;
//# sourceMappingURL=stuart.js.map