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

    /**
     * Static function that can be used to know if an id is valid
     * id should be:
     *  -any number that is negative, positive or zero
     *  -can't be float
     * @param {*} id: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidId(id) {
        return (typeof id === 'number' && isFinite(id) && (id % 1 === 0));
    }

    /**
     * Static function that can be used to know if a cost is valid
     * cost should be:
     *  -any number that is negative, positive, zero or float
     * @param {*} cost: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidCost(cost) {
        return (typeof cost === 'number' && isFinite(cost));
    }

    /**
     * Static function that can be used to know if a quantity is valid
     * quantity should be:
     *  -any number that is positive or zero
     *  -can't be negative
     *  -can't be float
     * @param {*} quantity: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidQuantity(quantity) {
        return (typeof quantity === 'number' && isFinite(quantity) && (quantity >= 0) && (quantity % 1 === 0));
    }

    /**
     * Static function that can be used to know if a description is valid
     * description should be:
     *  -any string
     *  -there is no size limit
     * @param {*} description: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidDescription(description) {
        return (typeof description === 'string');
    }

    /**
     * Set a new id to this instance if the id is valid
     * @param {Number} id: the new id to set
     * @return {InvoiceLine} returns itself in order to allow chainning
     */
    setId(id) {
        if (InvoiceLine.isValidId(id)) {
            this.id = id;
        }

        return this;
    }

    /**
     * Set a new cost to this instance if the cost is valid
     * @param {Number} cost: the new cost to set
     * @return {InvoiceLine} returns itself in order to allow chainning
     */
    setCost(cost) {
        if (InvoiceLine.isValidCost(cost)) {
            this.cost = cost;
        }

        return this;
    }

    /**
     * Set a new quantity to this instance if the quantity is valid
     * @param {Number} quantity: the new quantity to set
     * @return {InvoiceLine} returns itself in order to allow chainning
     */
    setQuantity(quantity) {
        if (InvoiceLine.isValidQuantity(quantity)) {
            this.quantity = quantity;
        }

        return this;
    }

    /**
     * Set a new description to this instance if the description is valid
     * @param {String} description: the new description to set
     * @return {InvoiceLine} returns itself in order to allow chainning
     */
    setDescription(description) {
        if (InvoiceLine.isValidDescription(description)) {
            this.description = description;
        }

        return this;
    }

    /**
     * returns the current id of this invoice line
     * @return {Number} the current id of this invoice line
     */
    getId() {
        return this.id;
    }

    /**
     * returns the current cost of this invoice line
     * @return {Number} the current cost of this invoice line
     */
    getCost() {
        return this.cost;
    }

    /**
     * returns the current quantity of this invoice line
     * @return {Number} the current quantity of this invoice line
     */
    getQuantity() {
        return this.quantity;
    }

    /**
     * returns the current description of this invoice line
     * @return {String} the current description of this invoice line
     */
    getDescription() {
        return this.description;
    }

    /**
     * returns a new instance of the current InvoiceLine
     * @return {InvoiceLine} the new instance cloned from the current invoice line
     */
    clone() {
        return (new InvoiceLine(this.id, this.cost, this.quantity, this.description));
    }

    /**
     * calculates the total of the current invoice line as
     *  Total = ( cost * quantity )
     * @return {Number} returns the Total of this invoice line
     */
    getTotal() {
        return (this.quantity * this.cost);
    }

    /**
     * returns a formated string that represents the invoic line ex:
     *
     *  5 Banana X $2.00 = $10.00
     *
     * @return {String} the current invoice line in a human readable format
     */
    toString() {
        return (this.quantity + ' ' + this.description + ' X $' + this.cost.toFixed(2) + ' = $' + this.getTotal().toFixed(2));
    }
}

module.exports = InvoiceLine;
