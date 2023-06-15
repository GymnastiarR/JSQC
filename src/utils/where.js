function recursive( data, logicOp ) {
    try {
        const query = Object.keys( data ).map( ( logicOperator ) => {

            if ( typeof data[ logicOperator ] == 'string' ) return `${logicOperator} = '${data[ logicOperator ]}'`;
            if ( typeof data[ logicOperator ] == 'number' ) return `${logicOperator} = ${data[ logicOperator ]}`;
            if ( typeof data[ logicOperator ] == 'boolean' ) return `${logicOperator} = ${data[ logicOperator ]}`;

            if ( logicOperator === 'AND' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `(${!( Array.isArray( rs ) ) ? rs : rs.join( " AND " )})`;
            }
            if ( logicOperator === 'OR' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `(${!( Array.isArray( rs ) ) ? rs : rs.join( " OR " )})`;
            }
            if ( logicOperator === 'andWhere' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `${!( Array.isArray( rs ) ) ? rs : rs.join( " AND " )}`;
            }
            if ( logicOperator === 'orWhere' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `${!( Array.isArray( rs ) ) ? rs : rs.join( " OR " )}`;
            }
            const result = Object.keys( data[ logicOperator ] ).map( function ( condition ) {
                if ( condition === 'AND' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `(${!( Array.isArray( rs ) ) ? rs : rs.join( " AND " )})`;
                }
                if ( condition === 'OR' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `(${!( Array.isArray( rs ) ) ? rs : rs.join( " OR " )})`;
                }
                if ( condition === 'andWhere' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `${!( Array.isArray( rs ) ) ? rs : rs.join( " AND " )}`;
                }
                if ( condition === 'orWhere' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `${!( Array.isArray( rs ) ) ? rs : rs.join( " OR " )}`;
                }


                if ( condition === 'equal' ) {
                    return `${logicOperator} = ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'like' ) {
                    return `${logicOperator} LIKE ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'greaterThan' ) {
                    return `${logicOperator} > ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'lessThan' ) {
                    return `${logicOperator} < ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'greaterThanEqual' ) {
                    return `${logicOperator} >= ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'lessThanEqual' ) {
                    return `${logicOperator} <= ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'notEqual' ) {
                    return `${logicOperator} != ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'in' ) {
                    return `${logicOperator} IN (${( data[ logicOperator ][ condition ] ).map( ( value ) => `'${value}'` ).join( ',' )})`;
                }
                if ( condition == 'notIn' ) {
                    return `${logicOperator} NOT IN ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'isNull' ) {
                    return `${logicOperator} IS NULL`;
                }
                if ( condition == 'isNotNull' ) {
                    return `${logicOperator} IS NOT NULL`;
                }
                if ( condition == 'isTrue' ) {
                    return `${logicOperator} IS TRUE`;
                }
                if ( condition == 'isFalse' ) {
                    return `${logicOperator} IS FALSE`;
                }
                if ( condition == 'isNot' ) {
                    return `${logicOperator} IS NOT ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'is' ) {
                    return `${logicOperator} IS ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'notLike' ) {
                    return `${logicOperator} NOT LIKE ${data[ logicOperator ][ condition ]}`;
                }
                throw new Error( `Error : ${condition} is not a condition` );
            } );
            return result.join( ` ${logicOp} ` );
        } );
        return ( !Array.isArray( query ) ? query : query.join( " AND " ) );
    } catch ( error ) {
        return ( error );
    }

};

export default recursive;