import recursive from "./utils/where.js";
import orderBy from "./utils/orderBy.js";

const select = function ( { table, fields, where, order, limit, join } ) {
    return new Promise( async ( resolve, reject ) => {
        try {
            let query = `SELECT ${fields ? Array.isArray( fields ) ? fields : Object.keys( fields ).map( ( field ) => Array.isArray( fields[ field ] ) ? fields[ field ].map( ( val ) => `${field}.${val}` ) : field ) : '*'} FROM`;

            if ( table ) {
                query = `${query} ${typeof table === "object" ? `(${await select( table )})` : `${table}`}`;
            }
            if ( join && !table ) {
                query = `${query} ${joinQuery( join )}`;
            }
            if ( where ) {
                const rs = recursive( where );
                if ( rs instanceof Error ) reject( rs );
                query = `${query && `${query} `}WHERE ${rs}`;
            }
            if ( order ) {
                query = `${query && `${query} `}${orderBy( order )}`;
            }
            if ( limit ) {
                query = `${query && `${query} `}LIMIT ${limit.num}${limit.offset ? ` OFFSET ${limit.offset}` : ''}`;
            }
            resolve( query );
        } catch ( error ) {
            reject( error );
        }

    } );
};

function joinQuery( join ) {
    try {
        const leftKey = Object.keys( join.on )[ 0 ];
        const rightKey = Object.keys( join.on )[ 1 ];
        const leftVal = Object.values( join.on )[ 0 ];
        const rightVal = Object.values( join.on )[ 1 ];

        return `(${typeof leftVal === "object" ? joinQuery( leftVal ) : leftKey} ${join.type} JOIN ${typeof rightVal === "object" ? joinQuery( rightVal ) : rightKey} ON ${leftKey}.${typeof leftVal === "object" ? leftVal[ leftKey ] : leftVal} = ${rightKey}.${typeof rightVal === "object" ? rightVal[ rightKey ] : rightVal})`;

    } catch ( error ) {
        console.log( error );
    }
}

export default select;