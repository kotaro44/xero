'use strict';

/**
 * This is a Full Test of the Invoice Class
 */
const assert = require('assert');
const {Invoice, InvoiceLine} = require('../classes/invoice.js');


/**
 * Test Properties
 */
const numberOfTests = 20;
var lineIdCount = 0;

/**
 * the properties constant specifies the main properties of the class,
 * the properties are ordered in the same order as they are require by their
 * constructor.
 *
 * the properties needs to define their setter and getter function to be heavily
 * tested with all the invalid and valid values of each property.
 */
const properties = [
    { // accepts only date objects
        id: 'date',
        name: 'Date',
        getter: 'getDate',
        setter: 'setDate',
        default: {
            value: (new Date()),
            name: 'today',
        },
        valid: [new Date(), new Date('2018-12-12'), new Date(1544832114187)],
        invalid: [-123122342342342342343, -123123, -5, -1, 0, 1, 5, 123123, 123122342342342342343, -0.12313, 0.87657657,
            -123123.12312333, 876786786876.213123, undefined, null, {}, {x: 2}, [], [1], [1, 2, 3], true, false,
            new InvoiceLine(), 'asasdasdd', '-121233', '12312', NaN, Infinity, -Infinity, (function() {}), new Date('aaa'),
        ],
    },
    { // accepts only integers but no floats, the number can be negative
        id: 'number',
        name: 'Number',
        getter: 'getNumber',
        setter: 'setNumber',
        default: {
            value: -1,
            name: -1,
        },
        valid: [-123122342342342342343, -123123, -5, -1, 0, 1, 5, 123123, 123122342342342342343],
        invalid: [-0.12313, 0.87657657, -123123.12312333, 876786786876.213123, undefined, null, '', 'simple', {},
            {x: 2}, [], [1], [1, 2, 3], true, false, new InvoiceLine(), NaN, Infinity, -Infinity, (function() {})
        ],
    },
    { // accepts only arrays with invoiceLine objects, every invoiceLine needs to have a unique id
        id: 'lines',
        name: 'Invoice Lines',
        getter: 'getLines',
        setter: 'setLines',
        default: {
            value: [],
            name: 'empty array',
        },
        valid: [
            [],
            [new InvoiceLine(1, 1, 1)],
            [new InvoiceLine(1, 1, 1), new InvoiceLine(2, 1, 1)],
            [new InvoiceLine(1), new InvoiceLine(2), new InvoiceLine(3)],
        ],
        invalid: [-123122342342342342343, -123123, -5, -1, 0, 1, 5, -0.12313, 0.87657657, -123123.12312333, 876786786876.213123,
            123123, 123122342342342342343, undefined, null, {}, {x: 2}, [false], [1], [1, 2, 3], true, false,
            new InvoiceLine(), 'asasdasdd', '-121233', '12312', NaN, Infinity, -Infinity, (function() {}),
            [new InvoiceLine(1), new InvoiceLine(2), new InvoiceLine(1)],
        ],
    },
];

/**
 * Main Test Actions
 */
describe('Invoice', () => {
    /**
     * Test the constructor an all properties of the class
     */
    describe('Constructor', () => {
        var invoice = new Invoice();

        describe('No arguments', () => {
            it('Should be able to create an empty Invoice object', () => {
                assertEqual((typeof invoice === 'object' && invoice instanceof Invoice), true);
            });

            properties.forEach(property => {
                it('Should have ' + property.default.name + ' as default ' + property.id, () => {
                    assertEqual(invoice[property.id], property.default.value);
                });
            });
        });

        properties.forEach((property, index) => {
            describe(property.name, () => {
                it('Should set ' + property.default.name + ' for invalid ' + property.id + ' values', () => {
                    property.invalid.forEach((value) => {
                        invoice = new Invoice(...getDefaultArgs(index), value);
                        assertEqual(invoice[property.id], property.default.value);
                    });
                });

                it('Should set the correct value for valid ' + property.id + 's', () => {
                    property.valid.forEach((value) => {
                        invoice = new Invoice(...getDefaultArgs(index), value);
                        assertEqual(invoice[property.id], value);
                    });
                });
            });
        });
    });

    /**
     * Test all getter and setter functions of each property
     */
    describe('Getters & Setters', () => {
        var invoice = null;

        properties.forEach((property, index) => {
            describe(property.name, () => {
                it('Should set ' + property.default.name + ' for invalid ' + property.id + 's', () => {
                    property.invalid.forEach((value) => {
                        invoice = new Invoice();
                        invoice[property.setter](value);
                        assertEqual(invoice[property.getter](), property.default.value);
                    });
                });

                it('Should set the correct value for valid ' + property.id + 's', () => {
                    property.valid.forEach((value) => {
                        invoice = new Invoice();
                        invoice[property.setter](value);
                        assertEqual(invoice[property.getter](), value);
                    });
                });
            });
        });
    });

    /**
     * Test the clone function
     */
    describe('Function: clone', () => {
        var rndProps = getRandomProps();
        var invoice = new Invoice(rndProps.date, rndProps.number, rndProps.lines);
        var clone = invoice.clone();

        it('The clone should have the same values and calculate same total', () => {
            properties.forEach(property => {
                assertEqual(invoice[property.id], clone[property.id]);
            });

            assertEqual(invoice.getTotal(), clone.getTotal());
        });

        it('Modifying the clone shouldn\'t affect the original instance', () => {
            properties.forEach((property, index) => {
                invoice[property.setter](property.default.value);
                assertEqual(clone[property.getter](), rndProps[property.id]);
            });
        });
    });

    /**
     * Test the toString function
     */
    describe('Function: toString', () => {
        var invoice = new Invoice();

        it('Should have a toString function', () => {
            assertEqual(typeof invoice.toString, 'function');
        });

        it('toString should return a String (we don\'t verify the content)', () => {
            assertEqual(typeof invoice.toString(), 'string');
        });
    });

    /**
     * Test the addInvoiceLine & removeInvoiceLine function
     */
    describe('Functions: getInvoiceLine, getAllInvoiceLines, addInvoiceLine & removeInvoiceLine', () => {
        var rndProps = getRandomProps();
        var invoice = new Invoice(rndProps.date, rndProps.number, rndProps.lines);
        var newLines = [];
        var newLine = null;

        it('Should add the lineInvoice at the end of the array and be able to retrieve it by id', () => {
            iterate(numberOfTests, () => {
                //generate a new line and save it on the local array
                newLine = getRandomInvoiceLine();
                newLines.push(newLine);
                //add the line to the invoice
                invoice.addInvoiceLine(newLine);
                assertEqual(invoice.getAllInvoiceLines().length, rndProps.lines.length + newLines.length);
                assertEqual(invoice.getAllInvoiceLines()[rndProps.lines.length + newLines.length - 1], newLine);
                assertEqual(invoice.getInvoiceLine(newLine.id), newLine);
            });
        });

        it('Should remove the lineInvoice at any position and not be able to retrieve it anymore', () => {
            iterate(numberOfTests, () => {
                //get a random line from the generated lines in the previous test
                newLine = newLines[Math.floor(Math.random() * newLines.length)];
                //remove the line from the local array to match the expected size of invoice lines
                newLines.splice(newLines.indexOf(newLine), 1);
                //remove the line from the invoice and test that the function should return the removed line
                assertEqual(invoice.removeInvoiceLine(newLine.id).id, newLine.id);
                assertEqual(invoice.getAllInvoiceLines().length, rndProps.lines.length + newLines.length);
                assertEqual(invoice.getInvoiceLine(newLine.id), undefined);
            });
        });
    });

    /**
     * Test the getTotal function
     */
    describe('Function: getTotal', () => {
        var invoice = new Invoice();
        var rndProps = null;
        var expectedTotal = null;

        it('Should have a getTotal function', () => {
            assertEqual(typeof invoice.getTotal, 'function');
        });

        it('Should calculate the total as the sum of all invoiceLines correctly', () => {
            iterate(numberOfTests, () => {
                rndProps = getRandomProps();
                invoice = new Invoice(rndProps.date, rndProps.number, rndProps.lines);
                expectedTotal = rndProps.lines.reduce((total, line) => {
                    return total + line.getTotal();
                }, 0);

                assertEqual(invoice.getTotal(), expectedTotal);
            });
        });
    });

    /**
     * Test the merge function
     */
    describe('Function: mergeInvoice', () => {
        var invoice = new Invoice();
        var invoice2 = null;
        var rndProps = null;
        var rndProps2 = null;
        var expectedTotal = null;

        it('Should have a mergeInvoice function', () => {
            assertEqual(typeof invoice.mergeInvoice, 'function');
        });

        it('Should calculate the total as the sum of all invoiceLines correctly after merging', () => {
            iterate(numberOfTests, () => {
                rndProps = getRandomProps();
                rndProps2 = getRandomProps();

                invoice = new Invoice(rndProps.date, rndProps.number, rndProps.lines);
                invoice2 = new Invoice(rndProps2.date, rndProps2.number, rndProps2.lines);

                //calculate the expected total of invoice 1 and invoice 2
                expectedTotal = rndProps.lines.concat(rndProps2.lines).reduce((total, line) => {
                    return total + line.getTotal();
                }, 0);

                //merge invoice 2 into invoice 1
                invoice.mergeInvoice(invoice2);
                assertEqual(invoice.getTotal(), expectedTotal);
            });
        });
    });
});

/**
 * returns a JSON object with random values of the properties of this class
 * @return {Object} an object with random generated values for each property of the class
 */
function assertEqual(value1, value2) {
    if (value1 instanceof Date && value2 instanceof Date) {
        value1 = value1.toDateString();
        value2 = value2.toDateString();
    }

    if (Array.isArray(value1) && Array.isArray(value2)) {
        assert.equal(value1.length, value2.length);
        value1.forEach((element, index) => {
            assertEqual(element, value2[index]);
        });
    } else {
        assert.equal(value1, value2);
    }
};

/**
 * returns a JSON object with random values of the properties of this class
 * @return {Object} an object with random generated values for each property of this class
 */
function getRandomProps() {
    var linesAmount = Math.floor((Math.random() * 100));
    var lines = [];

    iterate(linesAmount, () => {
        lines.push(getRandomInvoiceLine())
    });

    return {
        date: new Date(Math.floor((new Date()).getTime() * Math.random())), //gets a random date from Jan 01 1970 until Today
        number: Math.floor(Math.random() * 10000),
        lines: lines,
    };
};

/**
 * returns an instance of InvoiceLine with randomized properties
 * @return {InvoiceLine} the random instance
 */
function getRandomInvoiceLine() {
    var props = {
        id: lineIdCount++,
        cost: Math.random() * 100000,
        quantity: Math.floor(Math.random() * 1000000),
        description: '',
    };

    return (new InvoiceLine(props.id, props.cost, props.quantity, props.description));
};

/**
 * returns an array of the default values of this class in the same order
 * as required by the constructor so we can use the ... syntax to construct a new instance.
 * @param {int} until: limits the number of elements in the result truncating the remaining ones
 * @return {Array} the Array of default values
 */
function getDefaultArgs(until) {
    return properties.map(property => {
        return property.default.value;
    }).splice(0, until);
};

/**
 * iterate the function 'func' by the value passed in times argument
 * @param {int} times: number of times to iterate
 * @param {Function} func: the function to execute
 */
function iterate(times, func) {
    (new Array(times)).join('-').split('-').map((element, index) => {
        return index;
    }).forEach(func);
};
