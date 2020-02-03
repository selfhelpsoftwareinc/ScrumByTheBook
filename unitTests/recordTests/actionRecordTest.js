const allActionRecords = require("../../testSetups/actionRecords.js").allActionRecords; 
const databaseClass = require("../../Action.js").Action;
const assert = require('chai').assert;
const logger = require('../../node_modules/mocha-logger');

const numRecords = 17;
const recordClassName = 'Action';
const allRecords = allActionRecords();
const validColumns = databaseClass.columns;
const keyColumn = validColumns[0];

var foundSuffixes;

// test to make sure the record has the right number of columns
function testNumberOfColumns(aRecord) {
    var id = aRecord.at(keyColumn);
    assert.equal(aRecord.columnNames().length, validColumns.length, id)
}

// test to make sure the record's columns have the right names
function testColumnNames(aRecord) {
    var id = aRecord.at(keyColumn);
    assert.includeMembers(validColumns, aRecord.columnNames(), id);
}


// test the ID for uniqueness
function testKeyUniqueness(key) {
    // console.log(suffix);
    logger.log(key);
    assert.notInclude(foundSuffixes, key, key);  
}

// test ID column
function testKeyColumn(record) {
    var key;
    before(function () {
        key = record.at(keyColumn);
    });

    it('should have a unique key', function() {
        testKeyUniqueness(key);
    });

    after(function () {
        foundSuffixes.push(key);            
    });
}

// test each reacord
function testRecord(record) {
    describe('each ' + recordClassName +' record', function () {
        it('should contain ' + validColumns.length + ' columns', function() {
            testNumberOfColumns(record);
        });
        it('should contain the valid column names', function(){
            testColumnNames(record);
        });               
        describe('each '+ recordClassName + ' '+ keyColumn + ' column', function() {
            testKeyColumn(record);
        });
    });
}

// test suite
describe.skip(recordClassName + ' records', function () {
    before(function(){
        foundSuffixes = [];
    });
    it('should have '+ numRecords + ' records', function () {
        assert.equal(allRecords.length, numRecords);
    });
    it('should have valid records', function(){
        for (var record of allRecords) {
            testRecord(record);
        }        
    })
});

