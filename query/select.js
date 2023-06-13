import recursive from "./utils/where.js";
import orderBy from "./utils/orderBy.js";

const select = function ( { tableName, data, condition, order, limit, group } ) {
    return new Promise( async ( resolve, reject ) => {
        try {
            let query = '';
            if ( condition ) {
                query = `WHERE ${await recursive( condition )}`;
            }
            if ( group ) {
                query = `${query && `${query} `}GROUP BY ${group}`;
            }
            if ( order ) {
                query = `${query && `${query} `}${orderBy( order )}`;
            }
            if ( limit ) {
                query = `${query && `${query} `}LIMIT ${limit.num}${limit.offset && ` OFFSET ${limit.offset}`}`;
            }
            // console.log( `SELECT ${data ? Object.keys( data ) : '*'} FROM ${typeof tableName === "object" ? `(${select( tableName )})` : `${tableName}`} ${query}` );
            resolve( `SELECT ${data ? Object.keys( data ) : '*'} FROM ${typeof tableName === "object" ? `(${select( tableName )})` : `${tableName}`} ${query}` );
        } catch ( error ) {
            reject( new Error( error ) );
        }
    } );
};

export default select;