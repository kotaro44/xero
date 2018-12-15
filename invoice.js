'use strict';

const InvoiceLine = require('./invoiceLine.js');

class Invoice {
    constructor(date, number, lines) {
        this.date = new Date();
        this.number = -1;
        this.lines = [];

        this.setDate(date)
            .setNumber(number)
            .setLines(lines);
    }

    static isValidDate(date) {
        return (date instanceof Date && !isNaN(date.valueOf()));
    }

    static isValidNumber(number) {
        return (typeof number === 'number' && isFinite(number) && (number % 1 === 0));
    }

    static isValidLines(lines) {
        var isValid = true;
        var lineIds = null;

        if (Array.isArray(lines)) {
            lines.some(line => {
                if (!(line instanceof InvoiceLine)) {
                    return (isValid = false);
                }

                return true;
            });

            if (isValid) {
                lineIds = lines.map(line => {
                    return line.getId();
                });

                lineIds.some(id => {
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

    setDate(date) {
        if (Invoice.isValidDate(date)) {
            this.date = new Date(date.getTime());
        }

        return this;
    }

    setNumber(number) {
        if (Invoice.isValidNumber(number)) {
            this.number = number;
        }

        return this;
    }

    setLines(lines) {
        if (Invoice.isValidLines(lines)) {
            this.lines = lines.map(line => {
                return line;
            })
        }

        return this;
    }

    getDate() {
        return this.date;
    }

    getNumber() {
        return this.number;
    }

    getLines() {
        return this.lines;
    }

    addInvoiceLine(line) {
        if (line instanceof InvoiceLine) {
            return this.lines.push(line);
        }

        return this;
    }

    addInvoiceLines() {
        [].map.forEach(arguments, line => {
            this.addInvoiceLine(line);
        });

        return this;
    }

    getInvoiceLine(lineId) {
        return this.lines.find(line => {
            return line.id === lineId;
        });
    }

    getAllInvoiceLines() {
        return this.getLines();
    }

    removeInvoiceLine(lineId) {
        var line = this.getInvoiceLine(lineId);
        var linePosition = null;

        if (line) {
            linePosition = this.lines.indexOf(line);
            return this.lines.splice(linePosition, 1).pop();
        }
    }

    getTotal() {
        return this.lines.reduce((total, line) => {
            return (line.getTotal() + total);
        }, 0);
    }

    mergeInvoice(invoice) {
        if (invoice instanceof Invoice) {
            invoice.getAllInvoiceLines().forEach(line => {
                this.addInvoiceLine(line.clone());
            });
        }

        return this;
    }

    clone() {
        return (new Invoice(this.date, this.number, this.lines));
    }

    toString() {
        return 'Invoice #' + this.number + ' (' + this.date.toDateString() + '):\n' +
            this.lines.map(line => {
                return line.toString();
            }).join('\n') +
            ' Total: ' + this.getTotal();
    }
}

module.exports = {
    Invoice: Invoice,
    InvoiceLine: InvoiceLine,
};
