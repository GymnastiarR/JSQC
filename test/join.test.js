import join from "../src/join.js";

test( "Join two table", async () => {
    const query = {
        select: {
            orders: [ "orderId" ],
            customers: [ "customerId", "customerName" ],
        },
        join: {
            type: "LEFT",
            left: {
                orders: "customerId",
            },
            right: {
                customers: "customerId",
            }
        }
    };

    expect( await join( query ) ).toBe( "SELECT orders.orderId, customers.customerId, customers.customerName FROM orders LEFT JOIN customers ON orders.customerId = customers.customerId ;" );
} );


test( "Join four table", async () => {
    const query = {
        select: {
            orders: [ "orderId" ],
            customers: [ "customerId", "customerName" ],
            products: [ "productId", "productName" ],
            orderDetails: [ "orderDetailId", "quantity" ]
        },
        join: {
            type: "INNER",
            left: {
                orders: "customerId",
                join: {
                    type: "INNER",
                    left: {
                        orderDetails: "orderDetailId",
                    },
                    right: {
                        orders: "orderDetailid",
                    }
                }
            },
            right: {
                customers: "customerId",
            }
        }
    };
    expect( await join( query ) ).toBe( "SELECT orders.orderId, customers.customerId, customers.customerName, products.productId, products.productName, orderDetails.orderDetailId, orderDetails.quantity FROM (orderDetails INNER JOIN orders ON orderDetails.orderDetailId = orders.orderDetailid) INNER JOIN customers ON orders.customerId = customers.customerId ;" );
} );