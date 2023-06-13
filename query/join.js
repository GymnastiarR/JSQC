import orderBy from "./utils/orderBy.js";

const join = function ( { select, join, order } ) {
    const rs = `SELECT ${Object.keys( select ).map( ( tableName ) => {
        const result = select[ tableName ].map( ( field ) => {
            return `${tableName}.${field}`;
        } );
        return result.join( ", " );
    } ).join( ", " )}`;
    return `${rs} FROM ${recursive( join )} ${order ? orderBy( order ) : ''};`;
};

const recursive = function ( join ) {
    const query = `${join.left.join
        ? `(${recursive( join.left.join )})`
        : Object.keys( join.left )[ 0 ]} ${join.type} JOIN ${join.right.join
            ? `(${recursive( join.right.join )})`
            : Object.keys( join.right )[ 0 ]} ON ${Object.keys( join.left )[ 0 ]}.${Object.values( join.left )[ 0 ]} = ${Object.keys( join.right )[ 0 ]}.${Object.values( join.right )[ 0 ]}`;

    return query;
};

export default join;