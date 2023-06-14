import { select, del, join } from "./index.js";

try {
    const testing = await select( {
        tableName: "user",
        condition: {
            OR: {
                age: {
                    equal: 10,
                    greaterThan: 20
                },
            }
        }
    } );
    console.log( testing );
} catch ( error ) {
    console.log( error.message );
}


// const query = select( {
//     tableName: "USER",
//     condition: {
//         OR: {
//             age: {
//                 greaterThan: 20,
//                 lessThan: 30
//             }
//         }
//     }
// } );

// console.log( query );

// const delQuery = del( {
//     tableName: "USER",
//     condition: {
//         orWhere: {
//             isVerify: {
//                 equal: 1
//             },
//             name: {
//                 like: "%a%"
//             }
//         }
//     }
// } );

// console.log( query );
// console.log( "del", delQuery );

export default class Schema {
    User = {
        id: {
            primary: {
                autoincrement: true
            },
            type: "Integer",
        },
        email: {
            type: "String",
            unique: true
        },
        name: {
            type: "String",
            notNull: {
                conflict: 'FAIL',
            }
        },
        age: {
            type: "int"
        },
        isVerify: {
            type: "INTEGER",
            default: "FALSE"
        }
    };

    Customer = {
        name: {
            type: "String",
        },
        no_telf: {
            type: "int"
        },
        age: {
            type: "int"
        }
    };

    Order = {
        id: {
            type: "int",
            primary: {
                autoincrement: true
            }
        },
        customerId: {
            type: "int",
            foreign: {
                table: "CUSTOMER",
                column: "id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }
        }
    };
}

