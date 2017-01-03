import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

import { RequesteeList, ClassList, RequesteeClassList} from '../imports/api/studentRequestColl.js';

Meteor.startup(() => {  // code to run on server at startup
	
	// process.env.MAIL_URL = "smtp://postmaster@sandboxa5df1d1e70254c17b8ad560e9fb27fe9.mailgun.org:b12d280d5001b6ce712d8398c3b14afa@smtp.mailgun.org:587";
	// MAIL_URL = "smtp://postmaster@sandboxa5df1d1e70254c17b8ad560e9fb27fe9.mailgun.org:b12d280d5001b6ce712d8398c3b14afa@smtp.mailgun.org:587" meteor


});


Meteor.methods({  
	//Method to send Email
	sendEmail: function (to, from, subject, text) {
		//check([to, from, subject, text], [String]);
		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		//this.unblock();
		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	},


	//* IN ALL THE FOLLOWING 3 FUNCTIONS firstName and lastName are slippery slope. Use email instead
	createRequestedClass: function(clName) {
		ClassList.update({className: clName},
				{$set: {status: 1}});
		console.log('Create Class successful');
	},

	studentApproveClass: function(fiName, laName, clName) {
		createRequestedClass(clName);
		RequesteeClassList.update({className: clName, fname: fiName, lname: laName},
			{$set: {activeStatus: 1}});
		console.log('Approve class successful');
	},

	studentApproveAllClasses: function(fiName, laName) {
		var entries = RequesteeClassList.find({fname: fiName, lname: laName}).fetch();
		console.log(entries);
		for (var i = 0; i < entries.length; i++) {
			createRequestedClass(entries[i].className);
		}
		RequesteeClassList.update({fname: fiName, lname: laName},
			{$set: {activeStatus: 1}});
		console.log('Approve all successful');
	},

});

