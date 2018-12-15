'use strict';

/**
 * This is a Full Class Test of InvoiceLine
 */
const assert = require('assert');
const InvoiceLine = require('../invoiceLine.js');
const numberOfTests = 20;

/**
 * the properties constant specifies the main properties of the class,
 * the properties are ordered in the same order as they are require by their
 * constructor.
 *
 * the properties needs to define their setter and getter function to be heavily
 * tested with all the invalid and valid values of each property.
 */
const properties = [
    { // accepts integers but no floats, the id can be negative
        id: 'id',
        name: 'Line ID',
        getter: 'getId',
        setter: 'setId',
        default: {
            value: -1,
            name: -1,
        },
        valid: [-123122342342342342343, -123123, -5, -1, 0, 1, 5, 123123, 123122342342342342343],
        invalid: [-0.12313, 0.87657657, -123123.12312333, 876786786876.213123, undefined, null, {},
            {x: 2}, [], [1], [1, 2, 3], true, false, new InvoiceLine(),
            'asasdasdd', '-121233', '12312', NaN, Infinity, -Infinity, (function() {})
        ],
    },
    { // accepts integers and floats, the cost can be negative
        id: 'cost',
        name: 'Cost',
        getter: 'getCost',
        setter: 'setCost',
        default: {
            value: 0,
            name: 0,
        },
        valid: [-123122342342342342343, -123123, -5, -1, 0, 1, 5, 123123, 123122342342342342343, -0.12313,
        0.87657657, -123123.12312333, 876786786876.213123],
        invalid: [undefined, null, {}, {x: 2}, [], [1], [1, 2, 3], true, false, new InvoiceLine(),
            'asasdasdd', '-121233', '12312', NaN, Infinity, -Infinity, (function() {})
        ],
    },
    { // accepts integers but not floats and the quantity greater or equal to zero
        id: 'quantity',
        name: 'Quantity',
        getter: 'getQuantity',
        setter: 'setQuantity',
        default: {
            value: 0,
            name: 0,
        },
        valid: [0, 1, 5, 123123, 123122342342342342343],
        invalid: [-123122342342342342343, -123123, -5, -0.12313, 0.87657657, -123123.12312333, 876786786876.213123,
            undefined, null, {}, {x: 2}, [], [1], [1, 2, 3], true, false, new InvoiceLine(), 'asasdasdd', '-121233',
            '12312', NaN, Infinity, -Infinity, (function() {})
        ],
    },
    { // accepts only strings of any size
        id: 'description',
        name: 'Description',
        getter: 'getDescription',
        setter: 'setDescription',
        default: {
            value: '',
            name: 'empty string',
        },
        valid: ['', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'simple'],
        invalid: [undefined, null, {}, {x: 2}, [], [1], [1, 2, 3], true, false, new InvoiceLine(),
            -123122342342342342343, -123123, -5, -1, 0, 1, 5, 123123, 123122342342342342343, -0.12313, 0.87657657, -123123.12312333,
            876786786876.213123, NaN, Infinity, -Infinity, (function() {})
        ],
    },
];

/**
 * Main Test Actions
 */
describe('InvoiceLine', () => {
    /**
     * Test the constructor an all properties of the class
     */
    describe('Constructor', () => {
        var invoiceLine = new InvoiceLine();

        describe('No arguments', () => {
            it('Should be able to create an empty InvoiceLine object', () => {
                assert.equal((typeof invoiceLine === 'object' && invoiceLine instanceof InvoiceLine), true);
            });

            properties.forEach(property => {
                it('Should have ' + property.default.name + ' as default ' + property.id, () => {
                    assert.equal(invoiceLine[property.id], property.default.value);
                });
            });
        });

        properties.forEach((property, index) => {
            describe(property.name, () => {
                it('Should set ' + property.default.name + ' for invalid ' + property.id + 's', () => {
                    property.invalid.forEach((value) => {
                        invoiceLine = new InvoiceLine(...getDefaultArgs(index), value);
                        assert.equal(invoiceLine[property.id], property.default.value);
                    });
                });

                it('Should set the correct value for valid ' + property.id + 's', () => {
                    property.valid.forEach((value) => {
                        invoiceLine = new InvoiceLine(...getDefaultArgs(index), value);
                        assert.equal(invoiceLine[property.id], value);
                    });
                });
            });
        });
    });

    /**
     * Test all getter and setter functions of each property
     */
    describe('Getters & Setters', () => {
        var invoiceLine = null;

        properties.forEach((property, index) => {
            describe(property.name, () => {
                it('Should set ' + property.default.name + ' for invalid ' + property.id + 's', () => {
                    property.invalid.forEach((value) => {
                        invoiceLine = new InvoiceLine();
                        invoiceLine[property.setter](value);
                        assert.equal(invoiceLine[property.getter](), property.default.value);
                    });
                });

                it('Should set the correct value for valid ' + property.id + 's', () => {
                    property.valid.forEach((value) => {
                        invoiceLine = new InvoiceLine();
                        invoiceLine[property.setter](value);
                        assert.equal(invoiceLine[property.getter](), value);
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
        var invoiceLine = new InvoiceLine(rndProps.id, rndProps.cost, rndProps.quantity, rndProps.description);
        var clone = invoiceLine.clone();

        it('The clone should have the same values and calculate same total', () => {
            properties.forEach(property => {
                assert.equal(invoiceLine[property.id], clone[property.id]);
            });

            assert.equal(invoiceLine.getTotal(), clone.getTotal());
        });

        it('Modifying the clone shouldn\'t affect the original instance', () => {
            properties.forEach((property, index) => {
                invoiceLine[property.setter](property.default.value);

                assert.equal(clone[property.getter](), rndProps[property.id]);
            });
        });
    });

    /**
     * Test the toString function
     */
    describe('Function: toString', () => {
        var invoiceLine = new InvoiceLine();

        it('Should have a toString function', () => {
            assert.equal(typeof invoiceLine.toString, 'function');
        });

        it('toString should return a String (we don\'t verify the content)', () => {
            assert.equal(typeof invoiceLine.toString(), 'string');
        });
    });

    /**
     * Test the getTotal function
     */
    describe('Function: getTotal', () => {
        var cost = 0;
        var quantity = 0;
        var invoiceLine = new InvoiceLine();

        it('Should have a getTotal function', () => {
            assert.equal(typeof invoiceLine.getTotal, 'function');
        });

        it('Should calculate the total as (cost X quantity) correctly', () => {
            iterate(numberOfTests, () => {
                cost = Math.random() * 100000;
                quantity = Math.floor(Math.random() * 100000);

                invoiceLine = new InvoiceLine(1, cost, quantity);
                assert.equal(invoiceLine.getTotal(), cost * quantity);
            });
        });
    });
});

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
 * returns a JSON object with random values of the properties of this class
 * @return {Object} an object with random generated values for each property of this class
 */
function getRandomProps() {
    return {
        id: Math.floor(Math.random() * 10000),
        cost: Math.random() * 100000,
        quantity: Math.floor(Math.random() * 1000000),
        description: '',
    };
};

/**
 * iterate the function 'func' the number of times as the value passed in times argument
 * @param {int} times: number of times to iterate
 * @param {Function} func: the function to execute
 */
function iterate(times, func) {
    (new Array(times)).join('-').split('-').map((element, index) => {
        return index;
    }).forEach(func);
};
