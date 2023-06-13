import recursive from "./utils/where.js";
import orderBy from "./utils/orderBy.js";

const select = function ( { tableName, data, condition, order, limit } ) {
    let query = '';
    if ( condition ) {
        // queryCondition = `WHERE ${recursive( condition ).replace( /,/g, ' ' )}`;
        query = `WHERE ${recursive( condition )}`;
    }
    console.log( query );
    if ( order ) {
        query = `${query ? `${query} ` : ""}${orderBy( order )}`;
    }
    if ( limit ) {
        query = `${query ? `${query} ` : ""}LIMIT ${limit.num}${limit.offset ? ` OFFSET ${limit.offset}` : ''}`;
    }
    console.log( query );
    return `SELECT ${data ? Object.keys( data ) : '*'} FROM ${typeof tableName === "object" ? `(${select( tableName )})` : `${tableName}`} ${query}`;
};

export default select;