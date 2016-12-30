import { Template } from 'meteor/templating';

import { StudentRequestsLists } from '../api/studentRequestLists.js';

import './studentRequest.html';
import './studentRequest.css';

Template.body.onLoad = function() {
    	// $('#5').css('visibility', 'hidden');
}

Template.studentRequestForm.events({
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
		alert('HOLAD');
 
		const target = event.target;
		
		StudentRequestsLists.insert({
			fname: target.streqformfirstname.value,
			lname: target.streqformlastname.value,
			email: target.streqformemail.value,
			class1: target.streqformclass1.value,
			prof1: target.streqformprof1.value,
			class2: target.streqformclass2.value,
			prof2: target.streqformprof2.value,
			class3: target.streqformclass3.value,
			prof3: target.streqformprof3.value,
			class4: target.streqformclass4.value,
			prof4: target.streqformprof4.value,
			class5: target.streqformclass5.value,
			prof5: target.streqformprof5.value,
		});
		
		FlowRouter.go('studentRequestConfirm');
	}
});