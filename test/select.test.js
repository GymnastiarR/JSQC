import select from "../query/select.js";

test( "select", () => {
    const query = {
        tableName: "user",
        condition: {
            OR: {
                age: {
                    greterThan: 18,
                    lessThan: 30
                }
            }
        }
    };

    expect( select( query ) ).toBe( "SELECT * FROM user WHERE (age > 18 AND age < 30)" );
} )

