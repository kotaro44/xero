'use strict';

var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', ($scope) => {
    window.vm = $scope.vm = {
        edit: false,
        invoice: null,
        invoiceClone: null,
        invoiceToMerge: null,
        invoices: [],
        lineIds: 0,
    
        newInvoice: newInvoice,
        newInvoiceLine: newInvoiceLine,
        toggleEdit: toggleEdit,

        invoiceChanged: invoiceChanged,
        invoiceLineChanged: invoiceLineChanged,
        deleteInvoiceLine: deleteInvoiceLine,
        saveInvoice: saveInvoice,
        printInvoice: printInvoice,
        mergeInvoice: mergeInvoice,
        cloneInvoice: cloneInvoice,
    };

    function toggleEdit() {
    	$scope.vm.edit = !$scope.vm.edit;

    	if ($scope.vm.edit) {
    		$scope.vm.invoiceClone = $scope.vm.invoice.clone();
    	}
    };

    function newInvoice() {
        $scope.vm.invoices.push(new Invoice(null, $scope.vm.invoices.length + 1));
    };

    function newInvoiceLine() {
        $scope.vm.invoiceClone.addInvoiceLine(new InvoiceLine($scope.vm.lineIds++));
    };

    function deleteInvoiceLine(invoiceLine) {
    	$scope.vm.invoiceClone.removeInvoiceLine(invoiceLine.id);
    };

    function invoiceChanged() {
    	$scope.vm.invoiceClone.setNumber($scope.vm.invoiceClone.number)
    						  .setDate($scope.vm.invoiceClone.date);
    };

    function invoiceLineChanged(invoiceLine) {
        invoiceLine.setQuantity(invoiceLine.quantity)
                   .setDescription(invoiceLine.cost)
                   .setCost(invoiceLine.description);
    };

    function saveInvoice() {
    	$scope.vm.toggleEdit();
    	$scope.vm.invoice.setLines($scope.vm.invoiceClone.lines)
    					 .setNumber($scope.vm.invoiceClone.number)
    					 .setDate($scope.vm.invoiceClone.date);
    };

    function mergeInvoice() {
    	var invoiceToMerge = $scope.vm.invoices.find((invoice) => {
    		return invoice.number == $scope.vm.invoiceToMerge;
    	});

    	/**
    	 * We need to modify the lines id in order to be allowed to merge
    	 * since it only allows unique values
    	 */
    	if (invoiceToMerge) {
    		invoiceToMerge = invoiceToMerge.clone();
    		invoiceToMerge.lines.forEach((line) => {
    			line.setId($scope.vm.lineIds++);
    		});
    		$scope.vm.invoiceClone.mergeInvoice(invoiceToMerge);
    	}
    };

    function cloneInvoice(invoice) {
    	this.invoices.push(invoice.clone());
    };

    function printInvoice(invoice) {
    	console.log(invoice.toString());
    };
}]);