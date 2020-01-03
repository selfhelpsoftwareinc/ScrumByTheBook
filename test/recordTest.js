var recordClass = require("../Record.js"); 
const assert = require('chai').assert;

describe('assignee records', function () {
    it('should have three records', function () {
        var assigneeRecords = recordClass.Record.recordsFor('Assignee'); 
        assert.equal(assigneeRecords.length, 3);
    })
})
