export const CountOrderPrice = (cartItems, tax, discount) => {
    let subTotal = 0;

    for (const item of cartItems) {
        subTotal += item.quantity * item.price;
    }

    const taxAmount = (tax / 100) * subTotal;
    const discountAmount = (discount / 100) * subTotal;
    const total = subTotal + taxAmount - discountAmount;

    return {
        subTotal: subTotal,
        tax: taxAmount,
        discount: discountAmount,
        total: total,
    };
}