const insert = function ( { tableName, data } ) {
    return `INSERT INTO ${tableName} (${Object.keys( data )}) VALUES (${Object.values( data )})`;
};

export default insert;