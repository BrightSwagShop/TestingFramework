"use strict";
const { BaseApiSom } = require('./base-api.som');
class BackendApiSom extends BaseApiSom {
    getCategories() {
        return this.request.get('/api/categories');
    }
    getProductTypes() {
        return this.request.get('/api/producttypes');
    }
    uploadImageWithoutFile() {
        return this.request.post('/api/images/upload');
    }
}
module.exports = { BackendApiSom };
