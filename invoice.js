'use strict';

const InvoiceLine = require('./invoiceLine.js');

class Invoice {
    constructor(date = new Date(), number = '', lines = []) {
        this.setDate(date);
        this.setNumber(number);
        this.setLines(lines);
    }

    setDate(date) {
        if (date instanceof Date && !isNaN(date.valueOf())) {
            this.date = date;
        }
    }

    setNumber(number) {
        if (typeof number === 'string') {
            this.number = number;
        }
    }

    setLines(lines) {
        var isValid = true;

        if (Array.isArray(lines)) {
            lines.some(line => {
                if (!(line instanceof InvoiceLine)) {
                    return (isValid = false);
                }

                return true;
            });
        }
        else {
            isValid = false;
        }

        if (isValid) {
            this.lines = lines;
        }
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

    getInvoiceLine(id) {
        return this.lines.find(line => {
            return line.id === id;
        });
    }

    getAllInvoiceLines() {
        return this.lines;
    }

    removeInvoiceLine(id) {
        var line = this.getInvoiceLine(id);
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

    mergeInvoices() {
        [].map.forEach(arguments, invoice => {
            this.mergeInvoice(invoice);
        });

        return this;
    }

    clone() {
        return (new Invoice(this.date, this.number, this.lines));
    }

    toString() {
        return this.number + ' (' + this.date.toDateString() + '):\n' +
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
