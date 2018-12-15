'use strict';

class InvoiceLine {
    constructor(lineId, cost, quantity, description) {
        this.lineId = -1;
        this.cost = 0;
        this.quantity = 0;
        this.description = '';

        this.setLineId(lineId)
            .setCost(cost)
            .setQuantity(quantity)
            .setDescription(description);
    }

    static isValidLineId(lineId) {
        return (typeof lineId === 'number' && isFinite(lineId));
    }

    static isValidCost(cost) {
        return (typeof cost === 'number' && isFinite(cost));
    }

    static isValidQuantity(quantity) {
        return (typeof quantity === 'number' && isFinite(quantity) && quantity >= 0);
    }

    static isValidDescription(description) {
        return (typeof description === 'string');
    }

    setLineId(lineId) {
        if (InvoiceLine.isValidLineId(lineId)) {
            this.lineId = lineId;
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

    getLineId() {
        return this.lineId;
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
        return (new InvoiceLine(this.lineId, this.cost, this.quantity, this.description));
    }

    getTotal() {
        return (this.quantity * this.cost);
    }

    toString() {
        return (this.description + ' X ' + this.quantity + ' = ' + this.getTotal());
    }
}

module.exports = InvoiceLine;
