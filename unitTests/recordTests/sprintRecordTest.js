const allRecordsFunction = require("../../testSetups/sprintRecords.js").allSprintRecords; 
const databaseClass = require("../../Sprint.js").Sprint;
const assert = require('chai').assert;
const logger = require('../../node_modules/mocha-logger');

const validKeyPrefix = 'SPNT';
const numRecords = 2;
const recordClassName = 'Sprint';
const allRecords = allRecordsFunction();
const validColumns = databaseClass.columns;
const keyColumn = validColumns[0];

var foundKeys;

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

// test the ID column prefix
function testKeyPrefix(prefix) {
    // console.log(suffix);
    logger.log(prefix);
    assert.equal(prefix, validKeyPrefix, prefix);
}

// test the ID for uniqueness
function testKeyUniqueness(key) {
    // console.log(suffix);
    logger.log(key);
    assert.notInclude(foundKeys, key, key);  
}

// test ID column
function testKeyColumn(record) {
    var key;
    var parts;
    var prefix;  
    before(function () {
        key = record.at(keyColumn);
        parts = key.split('-');
        prefix = parts[0];  
    });
    it('should start with ' + validKeyPrefix, function() {
        testKeyPrefix(prefix);
    });
    it('should have a unique key', function() {
        testKeyUniqueness(key);
    });

    after(function () {
        foundKeys.push(key);            
    });
}

// test each reacord
function testRecord(record) {
    describe('each '+ recordClassName + ' record', function () {
        it('should contain '+ validColumns.length + ' columns', function() {
            testNumberOfColumns(record);
        });
        it('should contain the valid column names', function(){
            testColumnNames(record);
        });               
        describe('each '+ recordClassName + ' ' + keyColumn + ' column', function() {
            testKeyColumn(record);
        });
    });
}

// test suite
describe.skip(recordClassName + ' records', function () {
    before(function(){
        foundKeys = [];
    });
    it('should have ' + numRecords + ' records', function () {
        assert.equal(allRecords.length, numRecords);
    });
    it('should have valid records', function(){
        for (var record of allRecords) {
            testRecord(record);
        }        
    })
});

