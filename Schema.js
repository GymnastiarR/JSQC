import { select, del, join } from "./index.js";

const joinQuery = join( {
    select: {
        orders: [ "orderId" ],
        customers: [ "customerId", "customerName" ],
    },
    join: {
        type: "LEFT",
        right: {
            orders: "customerId",
        },
        left: {
            customers: "customerId",
        }
    },
    order: {
        asc: "customerName"
    }
} );

console.log( joinQuery );

// const query = select( {
//     tableName: "USER",
//     condition: {
//         OR: {
//             age: {
//                 greaterThan: 20,
//             },
//             andWhere: {
//                 age: {
//                     lessThan: 30
//                 },
//                 name: {
//                     like: "GYmans"
//                 }
//             },
//             AND: {
//                 name: {
//                     like: "%a%"
//                 },
//                 age: {
//                     greaterThan: 20,
//                     lessThan: 30
//                 }
//             },
//         }
//     }
// } );

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

