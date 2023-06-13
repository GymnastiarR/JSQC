const createTable = function () {
    return `CREATE TABLE IF NOT EXIST ${tableName} (${Object.keys( schema ).map( fieldName => {
        const field = schema[ fieldName ];
        return ` ${fieldName} ${field.type}${( function () {
            if ( field.primary ) {
                primary( field.primary );
            }
            if ( field.foreign ) {
                foreign( field.foreign );
            }
            if ( field.unique ) {
                if ( field.unique?.conflict ) {
                    return ` UNIQUE ON CONFLICT ${field.unique.conflict}`;
                }
                return ' UNIQUE';
            }
            if ( field.notNull ) {
                if ( field?.notNull.conflict ) {
                    return ` NOT NULL ON CONFLICT ${field.notNull.conflict}`;
                }
                return ' NOT NULL';
            }
            if ( field.default ) {
                if ( field.default?.string ) {
                    return ` DEFAULT '${field.default.string}'`;
                }
                if ( field.default?.number ) {
                    return ` DEFAULT '${field.default.number}'`;
                }
                return ` DEFAULT ${field.default}`;
            }
            return '';
        } )()
            }`;
    } )} )`;
};

export default createTable;