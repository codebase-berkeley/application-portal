/*
 * constructUrl
 * Converts a path and query params JSON into an AJAXable URL, so we don't have to use jQuery.
 */
export function constructUrl(route) {
    const { path, query } = route;
    let result = path.join("/");
    let queryArr = [];
    if (query && typeof query == "object") {
        //translate query JSON into an array of query parameter strings
        //ex: from { queryKey: "queryValue" } to ["queryKey=queryValue"]
        queryArr = Object.keys(query).sort()
            .filter(key => query[key] !== null)
            .map(key => `${key}=${query[key]}`);
    }

    //convert query param array into query string
    if (queryArr.length > 0) {
        result += `?${queryArr.join("&")}`;
    }

    return result;
}

/*
 * parseUrl
 * The inverse of constructUrl.
 */
export function parseUrl(windowHash) {
    let path = [];
    const query = {};
    const hashArr = windowHash.replace("#/", "").split("?");
    path = hashArr[0].split("/");

    if (hashArr.length > 1) {
        hashArr[1].split("&").forEach(str => {
            const kvPair = str.split("=");
            const key = kvPair[0];
            const value = kvPair[1];
            if (isNaN(value)) {
                query[key] = value;
            } else {
                query[key] = Number(value);
            }
        });
    }

    return { path, query };
}
