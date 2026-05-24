"use strict";
const { BaseApiSom } = require('./base-api.som');
class UsersApiSom extends BaseApiSom {
    register(payload) {
        return this.request.post('/api/users/register', { data: payload });
    }
    login(payload) {
        return this.request.post('/api/users/login', { data: payload });
    }
    getUserById(userId) {
        return this.request.get(`/api/users/${userId}`);
    }
}
module.exports = { UsersApiSom };
