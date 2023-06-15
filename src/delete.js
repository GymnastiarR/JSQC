import recursive from "./utils/where.js";

const del = function ( { tableName, condition } ) {
    let query = '';
    if ( condition ) {
        query = `WHERE ${recursive( condition )}`;
    }
    return `DELETE FROM ${tableName} ${query}`;
};

export default del;