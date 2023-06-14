import recursive from "./utils/where.js";
import orderBy from "./utils/orderBy.js";

const select = async function ( { tableName, data, condition, order, limit, group } ) {
    return await new Promise( async ( resolve, reject ) => {
        try {
            let query = '';
            if ( condition ) {
                // const rs = await 
                recursive( condition ).then( res => {
                    console.log( res );
                } );
                // console.log( rs );
                // query = `WHERE ${rs}`;
                // console.log( query );
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
            resolve( `SELECT ${data ? Object.keys( data ) : '*'} FROM ${typeof tableName === "object" ? `(${select( tableName )})` : `${tableName}`} ${query}` );
        } catch ( error ) {
            reject( new Error( error ) );
        }
    } );
};

export default select;