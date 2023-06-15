import select from "./src/select.js";
try {
    const query = {
        table: "User",
        condition: {
            name: "Gymnasium",
            kelas: "A",
        }
    };
    const rs = await select( query );
    console.log( rs );
} catch ( error ) {
    console.log( error );
}