import recursive from "./utils/where.js";
import orderBy from "./utils/orderBy.js";

const select = function ( { table, field, condition, order, limit } ) {
    return new Promise( async ( resolve, reject ) => {
        try {
            let query = '';
            if ( condition ) {
                const rs = recursive( condition );
                if ( rs instanceof Error ) reject( rs );
                query = `WHERE ${recursive( condition )}`;
            }
            if ( order ) {
                query = `${query ? `${query} ` : ""}${orderBy( order )}`;
            }
            if ( limit ) {
                query = `${query ? `${query} ` : ""}LIMIT ${limit.num}${limit.offset ? ` OFFSET ${limit.offset}` : ''}`;
            }
            const fieldName = typeof table === "object" ? `(${await select( table )})` : `${table}`;
            resolve( `SELECT ${field ? Object.keys( field ) : '*'} FROM ${fieldName} ${query}` );
        } catch ( error ) {
            reject( error );
        }

    } );
};

export default select;