'use strict';

var Call = require('./models/call');

var calls = [
  {
    businessName: 'Kroger',
    contactName: 'Paul',
    tech: 'Bill',
    phone: '123-321-1233',
    description: 'Paul said "Some stuff happened and now our refrigeration is broken..." Bill is on the way.',
    completed: false
  },
  {
    businessName: 'Food store',
    contactName: 'Igor',
    tech: 'Ted',
    phone: '123-444-1233',
    description: 'refrigerator is running...',
    note: 'fast!',
    completed: false
  },
  {
    businessName: 'The Bar',
    contactName: 'Patch',
    tech: 'Bill',
    phone: '123-321-0000',
    description: 'Beer ain\'t coldnuff.',
    completed: false
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
        note: call.note || ''
      });
    }
  });
});
