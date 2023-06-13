import select from "../query/select.js";

test( "OR", () => {
    const query = {
        tableName: "user",
        condition: {
            OR: {
                age: {
                    greaterThan: 18,
                    lessThan: 30
                }
            }
        }
    };

    expect( select( query ) ).toBe( "SELECT * FROM user WHERE (age > 18 OR age < 30)" );
} );

test( "AND", () => {
    const query = {
        tableName: "user",
        condition: {
            AND: {
                age: {
                    greaterThan: 18,
                    lessThan: 30
                }
            }
        }
    };

    expect( select( query ) ).toBe( "SELECT * FROM user WHERE (age > 18 AND age < 30)" );
} );

test( "NESTED Condition", () => {
    const query = {
        tableName: "user",
        condition: {
            AND: {
                isVerify: {
                    equal: 1
                },
                OR: {
                    age: {
                        greaterThan: 18,
                        lessThanEqual: 30
                    }
                }
            }
        }
    };

    expect( select( query ) ).toBe( "SELECT * FROM user WHERE (isVerify = 1 AND (age > 18 OR age <= 30))" );
} );

test( "Select Spesific Field", () => {
    const query = {
        tableName: "user",
        data: {
            id: true,
            name: true,
        },
        condition: {
            AND: {
                isVerify: {
                    equal: 1
                },
                name: {
                    like: "%Tiar%"
                }
            }
        }
    };

    expect( select( query ) ).toBe( "SELECT id,name FROM user WHERE (isVerify = 1 AND name LIKE %Tiar%)" );
} );

test( "NESTED condition with LIMIT", () => {
    const query = {
        tableName: "user",
        condition: {
            AND: {
                isVerify: {
                    equal: 1
                },
                OR: {
                    age: {
                        greaterThan: 18,
                        lessThanEqual: 30
                    }
                }
            }
        },
        limit: {
            num: 10
        }
    };
    expect( select( query ) ).toBe( "SELECT * FROM user WHERE (isVerify = 1 AND (age > 18 OR age <= 30)) LIMIT 10" );
} );

test( "Linear Condition", () => {
    const query = {
        tableName: "user",
        condition: {
            andWhere: {
                isVerify: {
                    equal: 1
                },
                age: {
                    greaterThan: 18
                }
            }
        }
    };
    expect( select( query ) ).toBe( "SELECT * FROM user WHERE isVerify = 1 AND age > 18" );
} );

test( "ORDER BY", () => {
    const query = {
        tableName: "user",
        order: {
            ASC: "name"
        }
    };
    expect( select( query ) ).toBe( "SELECT * FROM user ORDER BY name ASC" );
} );

test( "LIMIT", () => {
    const query = {
        tableName: "user",
        limit: {
            num: 1,
        }
    };
    expect( select( query ) ).toBe( "SELECT * FROM user LIMIT 1" );
} );

test( "NESTED FROM", () => {
    const query = {
        tableName: {
            tableName: "user",
            order: {
                ASC: "name"
            }
        },
        limit: {
            num: 1,
        },
    };
    expect( select( query ) ).toBe( "SELECT * FROM (SELECT * FROM user ORDER BY name ASC) LIMIT 1" );
} );