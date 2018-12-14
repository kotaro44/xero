'use strict';

class InvoiceLine {
    constructor(lineId = -1, cost = 0, quantity = 0, description = '') {
        this.setLineId(lineId);
        this.setCost(cost);
        this.setQuantity(quantity);
        this.setDescription(description);
    }

    setLineId(lineId) {
        if (isFinite(lineId)) {
            this.lineId = lineId;
        }
    }

    setCost(cost) {
        if (isFinite(cost)) {
            this.cost = cost;
        }
    }

    setQuantity(quantity) {
        if (isFinite(quantity) && quantity >= 0) {
            this.quantity = quantity;
        }
    }

    setDescription(description) {
        if (typeof description === 'string') {
            this.description = description;
        }
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
