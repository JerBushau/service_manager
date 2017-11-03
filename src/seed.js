'use strict';

var Call = require('./models/call');

var calls = [
  {
    businessName: 'Kroger',
    contactName: 'Paul',
    tech: 'Bill',
    phone: '123-321-1233',
    description: 'Paul said "Some stuff happened and now our refrigeration is broken..." Bill is on the way.',
    completed: false,
    time: new Date(2015, 6, 7, 1, 50)
  },
  {
    businessName: 'Food store',
    contactName: 'Igor',
    tech: 'Ted',
    phone: '123-444-1233',
    description: 'refrigerator is running...',
    note: 'fast!',
    completed: false,
    time: new Date(2014, 10, 4, 1, 10)
  },
  {
    businessName: 'The Bar',
    contactName: 'Patch',
    tech: 'Bill',
    phone: '123-321-0000',
    description: 'Beer ain\'t coldnuff.',
    completed: false,
    time: new Date(2013, 2, 1, 30, 10)
  },
];

calls.forEach(function (call, index) {
  Call.find({}, function(err, calls) {
    if (!err && !calls.length) {
      Call.create({
        businessName: call.businessName,
        contactName: call.contactName,
        tech: call.tech,
        phone: call.phone,
        description: call.description,
        completed: call.completed,
        time: call.time,
        note: call.note || ''
      });
    }
  });
});
