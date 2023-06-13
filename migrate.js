import Schema from "./Schema.js";

const schema = new Schema();
const queries = Object.keys( schema ).map( tableName => {
    return `CREATE TABLE IF NOT EXIST ${tableName} (${Object.keys( schema[ tableName ] ).map( fieldName => {
        const field = schema[ tableName ][ fieldName ];
        return ` ${fieldName} ${field.type}${( function () {
            if ( field.primary ) {
                let query = " PRIMARY KEY";
                if ( field.primary?.conflict ) {
                    query = `${query} ON CONFLICT ${field.primary.conflict}`;
                }
                if ( field.primary?.autoincrement ) {
                    query = `${query} AUTOINCREMENT`;
                }
                return query;
            }
            if ( field.foreign ) {
                let query = ` REFERENCES ${field.foreign.table} ( ${field.foreign.column} )`;
                if ( field.foreign?.onDelete ) {
                    query = `${query} ON DELETE ${field.foreign.onDelete}`;
                }
                if ( field.foreign?.onUpdate ) {
                    query = `${query} ON UPDATE ${field.foreign.onUpdate}`;
                }
                return query;
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
} );

function conflictHandler( constraint ) {

}

console.log( queries );
