const primary = function ( primary ) {
    let query = " PRIMARY KEY";
    if ( primary?.conflict ) {
        query = `${query} ON CONFLICT ${primary.conflict}`;
    }
    if ( primary?.autoincrement ) {
        query = `${query}`;
    }
    return query;
};


export default primary;