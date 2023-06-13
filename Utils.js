import config from "./config.js";

export const primary = function ( primary ) {
    let query = " PRIMARY KEY";
    if ( primary?.conflict ) {
        query = `${query} ON CONFLICT ${primary.conflict}`;
    }
    if ( primary?.autoincrement ) {
        query = `${query}`;
    }
    return query;
};

export const foreign = function () {
    let query = ` REFERENCES ${foreign.table} ( ${foreign.column} )`;
    if ( foreign?.onDelete ) {
        query = `${query} ON DELETE ${foreign.onDelete}`;
    }
    if ( foreign?.onUpdate ) {
        query = `${query} ON UPDATE ${foreign.onUpdate}`;
    }
    return query;
};