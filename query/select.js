import recursive from "./utils/where.js";
import orderBy from "./utils/orderBy.js";

const select = function ( { tableName, data, condition, order, limit } ) {
    let query = '';
    if ( condition ) {
        // queryCondition = `WHERE ${recursive( condition ).replace( /,/g, ' ' )}`;
        query = `WHERE ${recursive( condition )}`;
    }
    if ( order ) {
        query = `${query} ${orderBy( order )}}`;
    }
    if ( limit ) {
        query = `${query} LIMIT ${limit.num} ${limit.offset ? `OFFSET ${limit.offset}` : ''}`;
    }
    if ( !data ) return `SELECT * FROM ${tableName} ${query}`;
    return `SELECT ${Object.keys( data )} FROM ${tableName} ${query}`;
};

export default select;