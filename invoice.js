class Invoice {
    constructor(InvoiceDate = new Date(), InvoiceNumber = "", LineItems = []) {
        this.InvoiceDate = InvoiceDate;
        this.InvoiceNumber = InvoiceNumber;
        this.LineItems = LineItems;
    }

    /**
     * Adds a line to invoice
     * @param {Object} line - a line to add
    */
    AddInvoiceLine(line) {
        this.LineItems.push(line);
    };

    /**
     * Removes a line
    */
    RemoveInvoiceLine(id) {
        return null;
    };

    GetTotal() {
        return 0;
    };

    MergeInvoices() {
        return null;
    }

    Clone() {
        return null;
    };
}

module.exports = Invoice;