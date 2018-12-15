'use strict';
/*
    Welcome to the Xero technical excercise!
    ---------------------------------------------------------------------------------
    The test consists of a small invoice application that has a number of issues.
    Your job is to fix them and make sure you can perform the functions in each method below.
    Note your first job is to get the solution to execute!

    Rules
    ---------------------------------------------------------------------------------
    * The entire solution must be written in Javascript.
    * Feel free to use ECMA2015 (ES6) syntax
    * You can modify any of the code in this solution, split out classes etc
    * You can modify Invoice and InvoiceLine, rename and add methods, change property types (hint)
    * Feel free to use any libraries or frameworks you like
    * Feel free to write tests (hint)
    * Show off your skills!
    Good luck :)
    When you have finished the solution please zip it up and email it back to the recruiter or developer who sent it to you
*/

/**
 * Carlos:
 *
 * Originally this project was using a 'C#' like coding style on the namings, so the functions and properties were renamed
 * from 'Uper Camel Case' to just 'Camel Case' that matches more with JS standards.
 *
 * Classes remains in 'Uper Camel Case' since this is also a common standard in JS.
 * 
 * Invoice Number Type was modified from String to Number to follow a similar format with the Invoice line Id.
 */

//we can directly include both classes from invoice.js
const {Invoice, InvoiceLine} = require('./classes/invoice.js');

/**
 * This is a 'C' like program that declares a 'main' function that calls all the remianing function as needed.
 */
function main() {
    console.log('Welcome to Xero Tech Test! (modified by Carlos A. Sanchez)');
    console.log(); // new Line

    createInvoiceWithOneIem();
    createInvoiceWithMultipleItemsAndQuantities();
    removeItem();
    mergeInvoices();
    cloneInvoice();
    invoiceToString();
};


/**
 * Creates a single line Invoice Item and prints its total
 */
function createInvoiceWithOneIem() {
    const invoice = new Invoice();

    invoice.addInvoiceLine(new InvoiceLine(1, 6.99, 1, 'Apple'));
    console.log('Invoice with one Item:', invoice.lines);
};

/**
 * Creates a multiple line Invoice Item with their respective qunatities and prints its total
 */
function createInvoiceWithMultipleItemsAndQuantities () {
    const invoice = new Invoice();

    /**
     * invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 4, 'Banana'));
     * invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, 'Orange' ));
     * invoice.addInvoiceLine(new InvoiceLine(3, 6.21, 5, 'Pineapple'));
     */

    //this can be rewritten like this:
    invoice.addInvoiceLines(new InvoiceLine(1, 10.21, 4, 'Banana'),
                            new InvoiceLine(2, 5.21, 1, 'Orange'),
                            new InvoiceLine(3, 6.21, 5, 'Pineapple'));

    /**
     * I'm not doing the format (toFixed) inside the getTotal since is better to keep the exact value
     */
    console.log('Multiple Items & Quantities: $' + invoice.getTotal().toFixed(2));
};

/**
 * Creates a multiple line Invoice Item and removes one of ts items
 */
function removeItem() {
    const invoice = new Invoice();

    invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 1, 'Orange'))
           .addInvoiceLine(new InvoiceLine(2, 10.99, 5, 'Banana'))
           .removeInvoiceLine(1);

    console.log('Remove Item: $' + invoice.getTotal().toFixed(2));
};

/**
 * Creates 2 Invoices and merge them together to calculate the total
 */
function mergeInvoices() {
    const invoice1 = new Invoice();
    const invoice2 = new Invoice();

    invoice2.addInvoiceLine(new InvoiceLine(2, 5.29, 4, 'Orange'))
            .addInvoiceLine(new InvoiceLine(3, 9.99, 1, 'Banana'));

    invoice1.addInvoiceLine(new InvoiceLine(1, 10.21, 1, 'Blueberries'))
            .mergeInvoice(invoice2);

    console.log('Merge Invoices: $' + invoice1.getTotal().toFixed(2));
};

/**
 * Creates an Invoice object and clones it
 */
function cloneInvoice() {
    const invoice = new Invoice();
    const clonedInvoice = invoice.addInvoiceLine(new InvoiceLine(1, 0.99, 5, 'Onion'))
                                 .addInvoiceLine(new InvoiceLine(2, 10.49, 2, 'Watermelon'))
                                 .clone();

    console.log('Cloned Invoice: $' + clonedInvoice.getTotal().toFixed(2));
};

/**
 * Creates an Invoice and prints it in teh console
 */
function invoiceToString() {
    const invoice = new Invoice(
        new Date(),
        1000,
        [
            new InvoiceLine(1, 1.99, 20, 'Peer'),
        ],
    );

    console.log(); // new line
    console.log(invoice.toString());
};

/**
 * Finally call the main
 */
main();
