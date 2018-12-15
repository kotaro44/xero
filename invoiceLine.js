'use strict';

class InvoiceLine {
    /**
     * Creates a new InvoiceLine instance.
     * An InvoiceLine represents a line inside an invoice ex.
     *
     *  3 Bananas X $2.00 = $6.00
     *
     * @constructor
     */
    constructor(id, cost, quantity, description) {
        this.id = -1;
        this.cost = 0;
        this.quantity = 0;
        this.description = '';

        this.setId(id)
            .setCost(cost)
            .setQuantity(quantity)
            .setDescription(description);
    }

    static isValidId(id) {
        return (typeof id === 'number' && isFinite(id) && (id % 1 === 0));
    }

    static isValidCost(cost) {
        return (typeof cost === 'number' && isFinite(cost));
    }

    static isValidQuantity(quantity) {
        return (typeof quantity === 'number' && isFinite(quantity) && (quantity >= 0) && (quantity % 1 === 0));
    }

    static isValidDescription(description) {
        return (typeof description === 'string');
    }

    setId(id) {
        if (InvoiceLine.isValidId(id)) {
            this.id = id;
        }

        return this;
    }

    setCost(cost) {
        if (InvoiceLine.isValidCost(cost)) {
            this.cost = cost;
        }

        return this;
    }

    setQuantity(quantity) {
        if (InvoiceLine.isValidQuantity(quantity)) {
            this.quantity = quantity;
        }

        return this;
    }

    setDescription(description) {
        if (InvoiceLine.isValidDescription(description)) {
            this.description = description;
        }

        return this;
    }

    getId() {
        return this.id;
    }

    getCost() {
        return this.cost;
    }

    getQuantity() {
        return this.quantity;
    }

    getDescription() {
        return this.description;
    }

    clone() {
        return (new InvoiceLine(this.id, this.cost, this.quantity, this.description));
    }

    getTotal() {
        return (this.quantity * this.cost);
    }

    toString() {
        return (this.quantity + ' ' + this.description + ' X $' + this.cost.toFixed(2) + ' = ' + this.getTotal().toFixed(2));
    }
}

module.exports = InvoiceLine;
