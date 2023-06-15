const foreign = function () {
    let query = ` REFERENCES ${foreign.table} ( ${foreign.column} )`;
    if ( foreign?.onDelete ) {
        query = `${query} ON DELETE ${foreign.onDelete}`;
    }
    if ( foreign?.onUpdate ) {
        query = `${query} ON UPDATE ${foreign.onUpdate}`;
    }
    return query;
};


export default foreign;