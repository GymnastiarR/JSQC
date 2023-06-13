const orderBy = function ( order ) {
    return `ORDER BY ${Object.keys( order ).map( ( key ) => `${order[ key ]} ${key}` )}`;
};;

export default orderBy;