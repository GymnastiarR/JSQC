import select from "./src/select.js";
try {
    const query = {
        table: "user",
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