import select from "../src/select.js";

test( "OR", async () => {
    const query = {
        table: "user",
        where: {
            OR: {
                age: {
                    greaterThan: 18,
                    lessThan: 30
                }
            }
        }
    };

    expect( await select( query ) ).toBe( "SELECT * FROM user WHERE (age > 18 OR age < 30)" );
} );

test( "AND", async () => {
    const query = {
        table: "user",
        where: {
            AND: {
                age: {
                    greaterThan: 18,
                    lessThan: 30
                }
            }
        }
    };

    expect( await select( query ) ).toBe( "SELECT * FROM user WHERE (age > 18 AND age < 30)" );
} );

test( "NESTED where", async () => {
    const query = {
        table: "user",
        where: {
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

    expect( await select( query ) ).toBe( "SELECT * FROM user WHERE (isVerify = 1 AND (age > 18 OR age <= 30))" );
} );

test( "Select Spesific Fields", async () => {
    const query = {
        table: "user",
        fields: {
            id: true,
            name: true,
        },
        where: {
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

    expect( await select( query ) ).toBe( "SELECT id,name FROM user WHERE (isVerify = 1 AND name LIKE %Tiar%)" );
} );

test( "Select Spesific Fields", async () => {
    const query = {
        table: "user",
        fields: [ "id", "name" ],
        where: {
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

    expect( await select( query ) ).toBe( "SELECT id,name FROM user WHERE (isVerify = 1 AND name LIKE %Tiar%)" );
} );

test( "NESTED where with LIMIT", async () => {
    const query = {
        table: "user",
        where: {
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
    expect( await select( query ) ).toBe( "SELECT * FROM user WHERE (isVerify = 1 AND (age > 18 OR age <= 30)) LIMIT 10" );
} );

test( "Linear where", async () => {
    const query = {
        table: "user",
        where: {
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
    expect( await select( query ) ).toBe( "SELECT * FROM user WHERE isVerify = 1 AND age > 18" );
} );

test( "ORDER BY", async () => {
    const query = {
        table: "user",
        order: {
            ASC: "name"
        }

    };
    expect( await select( query ) ).toBe( "SELECT * FROM user ORDER BY name ASC" );
} );

test( "LIMIT", async () => {
    const query = {
        table: "user",
        limit: {
            num: 1,
        }

    };
    expect( await select( query ) ).toBe( "SELECT * FROM user LIMIT 1" );
} );

test( "NESTED FROM", async () => {
    const query = {
        table: {
            table: "user",
            order: {
                ASC: "name"
            }
        },
        limit: {
            num: 1,
        },

    };
    expect( await select( query ) ).toBe( "SELECT * FROM (SELECT * FROM user ORDER BY name ASC) LIMIT 1" );
} );

test( "Reject where", async () => {
    try {
        const query = {
            table: "User",
            where: {
                name: {
                    greterThan: 20
                }
            }
        };
        const rs = await select( query );
    } catch ( error ) {
        expect( error.message ).toBe( "Error : greterThan is not a condition" );
    }
} );

test( "IN where", async () => {
    const query = {
        table: "User",
        where: {
            id: {
                in: [ 1, 2, 3 ]
            }
        }
    };
    expect( await select( query ) ).toBe( "SELECT * FROM User WHERE id IN ('1','2','3')" );
} );

test( "simple shortcut", async () => {
    const query = {
        table: "User",
        where: {
            id: 1
        }
    };
    expect( await select( query ) ).toBe( "SELECT * FROM User WHERE id = 1" );
} );


test( "simple shortcut with two where", async () => {
    const query = {
        table: "User",
        where: {
            id: 1,
            name: "Gymnas",
        }
    };
    expect( await select( query ) ).toBe( `SELECT * FROM User WHERE id = 1 AND name = 'Gymnas'` );
} );

test( "test aja nih ya", async () => {
    const query = {
        table: "User",
        fields: {
            user: [ "id", "name" ],
            order: [ "id", "sum" ]
        },
        where: {
            id: 1,
            name: "Gymnas",
        }
    };
    expect( await select( query ) ).toBe( `SELECT user.id,user.name,order.id,order.sum FROM User WHERE id = 1 AND name = 'Gymnas'` );
} );