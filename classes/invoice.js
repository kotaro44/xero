'use strict';

const InvoiceLine = require('./invoiceLine.js');

class Invoice {
    /**
     * Creates a new Invoice instance.
     * An Invoice is a collection of InvoiceLines with unique Id's
     * @constructor
     */
    constructor(date, number, lines) {
        this.date = new Date();
        this.number = -1;
        this.lines = [];

        this.setDate(date)
            .setNumber(number)
            .setLines(lines);
    }

    /**
     * Static function that can be used to know if a date is valid
     * date should be:
     *  -any valid instance of date
     * @param {*} date: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidDate(date) {
        return (date instanceof Date && !isNaN(date.valueOf()));
    }

    /**
     * Static function that can be used to know if a number is valid
     * number should be:
     *  -any number that is negative, positive or zero
     *  -can't be float
     * @param {*} number: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidNumber(number) {
        return (typeof number === 'number' && isFinite(number) && (number % 1 === 0));
    }

    /**
     * Static function that can be used to know if a collection of lines is valid
     * lines should be:
     *  -any array object that includes only valid instances of InvoiceLine
     *  -the id's of each InvoiceLine should be unique
     * @param {*} lines: the argument to test
     * @return {Boolean} the result of the validation
     */
    static isValidLines(lines) {
        var isValid = true;
        var lineIds = null;

        if (Array.isArray(lines)) {
            /**
             * check if every single item is an InvoiceLine
             */
            lines.some(line => {
                if (!(line instanceof InvoiceLine)) {
                    return (isValid = false);
                }

                return true;
            });

            /**
             * if the lines still valid, check that all ids are unique in this invoice
             */
            if (isValid) {
                lineIds = lines.map(line => {
                    return line.getId();
                });

                lineIds.some(id => {
                    /**
                     * is unique
                     */
                    if (lineIds.indexOf(id) !== lineIds.lastIndexOf(id)) {
                        return (isValid = false);
                    }

                    return true;
                });
            }

        }
        else {
            isValid = false;
        }

        return isValid;
    }

    /**
     * Set a new date to this instance if the date is valid
     * @param {Date} date: the new date to set
     * @return {Invoice} returns itself in order to allow chainning
     */
    setDate(date) {
        if (Invoice.isValidDate(date)) {
            this.date = new Date(date.getTime());
        }

        return this;
    }

    /**
     * Set a new number to this instance if the number is valid
     * @param {Number} number: the new number to set
     * @return {Invoice} returns itself in order to allow chainning
     */
    setNumber(number) {
        if (Invoice.isValidNumber(number)) {
            this.number = number;
        }

        return this;
    }

    /**
     * Set a new collection of lines to this instance if the lines are valid
     * @param {Array} lines: the new collection of lines to set
     * @return {Invoice} returns itself in order to allow chainning
     */
    setLines(lines) {
        if (Invoice.isValidLines(lines)) {
            this.lines = lines.map(line => {
                return line;
            })
        }

        return this;
    }

    /**
     * returns the current date of this invoice
     * @return {Date} the current date of this invoice
     */
    getDate() {
        return this.date;
    }

    /**
     * returns the number date of this invoice
     * @return {Number} the current date of this invoice
     */
    getNumber() {
        return this.number;
    }

    /**
     * returns the current lines collection of this invoice
     * @return {Array} the current lines collection of this invoice
     */
    getLines() {
        return this.lines;
    }

    /**
     * add a new InvoiceLine to the collection if the line is valid and it's
     * id is unique.
     * @param {InvoiceLine} line: the new line to add to the collection
     * @return {Invoice} returns itself in order to allow chainning
     */
    addInvoiceLine(line) {
        var linesClone = null;

        if (line instanceof InvoiceLine) {
            linesClone = this.lines.map(line => {
                return line.clone();
            });

            linesClone.push(line);

            if (Invoice.isValidLines(linesClone)) {
                this.setLines(linesClone);
            }
        }

        return this;
    }

    /**
     * addInvoiceLines is just a wrapper of addInvoiceLine that allows multiple lines
     * separated by comma, ex:
     *
     *    myInvoice.addInvoiceLines(myLine1, myLine2, myLine3)
     *
     * @param {*} lines: several lines separated by comma
     * @return {Invoice} returns itself in order to allow chainning
     */
    addInvoiceLines(...args) {
        args.forEach(line => {
            this.addInvoiceLine(line);
        });

        return this;
    }

    /**
     * search an invoiceLine with the passed lineId and returns the matched InvoiceLine,
     * if the line is not found it will return undefined.
     * @param {Number} lineId: the lineId to search with
     * @return {InvoiceLine} returns the matching InvoiceLine
     */
    getInvoiceLine(lineId) {
        return this.lines.find(line => {
            return line.id === lineId;
        });
    }

    /**
     * this function is just a synomyn for getLines
     * @return {Array} returns the current lines colelction
     */
    getAllInvoiceLines() {
        return this.getLines();
    }

    /**
     * deletes the InvoiceLine that matches with the passed lineId, if the
     * invoice line is found, it will return its instance, returns undefined otherwise
     * @param {Number} lineId: the lineId to search with
     * @return {InvoiceLine} returns the matching InvoiceLine
     */
    removeInvoiceLine(lineId) {
        var line = this.getInvoiceLine(lineId);
        var linePosition = null;

        if (line) {
            linePosition = this.lines.indexOf(line);
            return this.lines.splice(linePosition, 1).pop();
        }
    }

    /**
     * calculates the total of the current invoice collection, total is defined as:
     *  Total = sum(Invoice1.getTotal(), Invoice2.getTotal(), ... , InvoiceX.getTotal());
     * it returns 0 if there is no any Invoice Line.
     * @return {Number} returns the Total of the invoice line collection
     */
    getTotal() {
        return this.lines.reduce((total, line) => {
            return (line.getTotal() + total);
        }, 0);
    }

    /**
     * copies all the lines of an external invoice and add them to the current instance,
     * if a line is not able to be merge due to a duplicated id, the merge will be ignored
     * @param {Invoice} invoice: invoice to be merge
     * @return {Invoice} returns itself in order to allow chainning
     */
    mergeInvoice(invoice) {
        var newLines = null;

        if (invoice instanceof Invoice) {
            newLines = this.lines.concat(invoice.getAllInvoiceLines().map(line => {
                return line.clone();
            }));

            this.setLines(newLines);
        }

        return this;
    }

    /**
     * returns a new instance of the current invoice
     * @return {Invoice} the new instance cloned from the current invoice
     */
    clone() {
        return (new Invoice(this.date, this.number, this.lines));
    }

    /**
     * returns a formated string that represents the entire invoice ex.
     *
     *       ------------------ Invoice #38 ------------------
     *        Sat Dec 15 2018
     *
     *           1 Blueberries X $10.21 = $10.21
     *           4 Orange X $5.29 = $21.16
     *           1 Banana X $9.99 = $9.99
     *
     *        Total: $41.36
     *
     * @return {String} the current invoice in a human readable format
     */
    toString() {
        return [
            '------------------ ' + 'Invoice #' + this.number + ' ------------------',
            ' ' + this.date.toDateString(),
            '',
            ...this.lines.map(line => {return '    ' + line.toString();}),
            '',
            ' Total: $' + this.getTotal().toFixed(2),
            '',
        ].join('\n');
    }
}

/**
 * Since InvoiceLine is fully required by this class, we export it as well in order to ex
 * mosule trying to import Invoice can also import InvoiceLine directly.
 */
module.exports = {
    Invoice: Invoice,
    InvoiceLine: InvoiceLine,
};
