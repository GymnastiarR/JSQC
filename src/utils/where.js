function recursive( data, logicOp ) {
    try {
        const query = Object.keys( data ).map( ( logicOperator ) => {
            if ( logicOperator === 'AND' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `(${rs.join( " AND " )})`;
            }
            if ( logicOperator === 'OR' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `(${rs.join( " OR " )})`;
            }
            if ( logicOperator === 'andWhere' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `${rs.join( " AND " )}`;
            }
            if ( logicOperator === 'orWhere' ) {
                const rs = recursive( data[ logicOperator ], logicOperator );
                return `${rs.join( " OR " )}`;
            }
            const result = Object.keys( data[ logicOperator ] ).map( function ( condition ) {
                if ( condition === 'AND' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `(${rs.join( " AND " )})`;
                }
                if ( condition === 'OR' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `(${rs.join( " OR " )})`;
                }
                if ( condition === 'andWhere' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `${rs.join( " AND " )}`;
                }
                if ( condition === 'orWhere' ) {
                    const rs = recursive( data[ logicOperator ][ condition ], condition );
                    return `${rs.join( " OR " )}`;
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
                    return `${logicOperator} IN ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'notIn' ) {
                    return `${logicOperator} NOT IN ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'between' ) {
                    return `${logicOperator} BETWEEN ${data[ logicOperator ][ condition ]}`;
                }
                if ( condition == 'notBetween' ) {
                    return `${logicOperator} NOT BETWEEN ${data[ logicOperator ][ condition ]}`;
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
        return query;
    } catch ( error ) {
        return ( error );
    }

};

export default recursive;