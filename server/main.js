import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

import '../imports/api/studentRequestColl.js';

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
	}


});