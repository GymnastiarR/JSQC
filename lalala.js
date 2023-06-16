import select from "./src/select.js";
try {
    const query = {
        fields: {
            user: [ "userId", "name", "age" ],
            order: [ "orderId", "customerId" ],
            history: [ "historyId", "userId" ]
        },
        join: {
            type: "INNER",
            on: {
                user: {
                    user: "userId",
                    type: "LEFT",
                    on: {
                        user: "userId",
                        history: "userId"
                    }
                },
                order: "customerId"
            }
        },
        where: {
            AND: {
                name: "Gymnas",
                age: {
                    greaterThan: 18,
                    lessThanEqual: 30
                }
            }
        },
        limit: {
            num: 10
        }
    };
    const rs = await select( query );
    console.log( rs );
} catch ( error ) {
    console.log( error );
}