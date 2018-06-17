const DEFAULT_PARAMS = 'default';

function define(url, params = DEFAULT_PARAMS, response, store) {

    const entry = store[url];

    const data = {
        params: JSON.stringify(params),
        response: JSON.stringify(response)
    };

    if (entry) {
        const found = entry.find(item => item.params === data.params);

        if (found) {
            found.response = data.response;
        } else {
            entry.push(data);
        }

    } else {
        store[url] = [data];
    }

}

function request(url, params = DEFAULT_PARAMS, store) {
    return new Promise((resolve, reject) => {

        const entry = store[url];

        if (entry) {
            const _params = JSON.stringify(params);
            const found = entry.find(item => item.params === _params);

            if (found) {
                resolve(JSON.parse(found.response));
            } else {
                reject({});
            }

        } else {
            reject({});
        }

    });
}

function store() {

    const store = {};

    this.define = ({url, params, response}) => {
        define(url, params, response, store);

        return this;
    };

    this.get = (url, params) => request(url, params, store);
    this.post = (url, params) => request(url, params, store);
    this.put = (url, params) => request(url, params, store);
    this.delete = (url, params) => request(url, params, store);

    return this;
}

module.exports = store;
