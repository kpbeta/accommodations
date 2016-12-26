import { Template } from 'meteor/templating';

import { StudentRequestsLists } from '../api/studentRequestLists.js';

import './studentRequest.html';
import './studentRequest.css';

Template.body.onLoad = function() {
    	// $('#5').css('visibility', 'hidden');
}

Template.body.events({
	'click #addclass2'(event) {	
		$('#class2').css('display', 'block');
	},

	'click #addclass3'(event) {
		$('#class3').css('display', 'block');
	},

	'click #addclass4'(event) {
		$('#class4').css('display', 'block');
	},

	'click #addclass5'(event) {
		$('#class5').css('display', 'block');
	},

	'submit #studentrequestform'(event) {
		event.preventDefault();
 
		let target = event.target;
		alert(target);

		StudentRequestsLists.insert({
			fname: target.streqfirstname,
			lname: target.streqlastname,
			email: target.streqformemail,
			class1: target.streqclass1,
			prof1: target.streqprof1,
			class2: target.streqclass2,
			prof2: target.streqprof2,
			class3: target.streqclass3,
			prof3: target.streqprof3,
			class4: target.streqclass4,
			prof4: target.streqprof4,
			class5: target.streqclass5,
			prof5: target.streqprof5,
		});
		alert("submitted");
	}
});