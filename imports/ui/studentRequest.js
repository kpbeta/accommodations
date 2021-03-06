import { Template } from 'meteor/templating';

import { RequesteeList, ClassList, RequesteeClassList } from '../api/studentRequestColl.js';

import './studentRequest.html';
import './studentRequest.css';

var secretWord = "myApp";
function createVerificationEmail(stfname, stlname, email, studentId, salt) {
	let emailSplit = email.split("."); 
	let v_url = "http://localhost:3000/verify/"+emailSplit[0]+"--"+emailSplit[1]+"--";
	v_url += CryptoJS.MD5(stfname+stlname+studentId.substring(10), salt);
	return v_url;
};

Template.body.onLoad = function() {
    	// $('#5').css('visibility', 'hidden');
}


Template.studentRequest.events({
	'click #addclass2'(event) {	
		$('#class2').css('display', 'block');
		console.log(CryptoJS.MD5('Message').toString().substring(12));
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
 
		const target = event.target;
		let firstName = target.streqformfirstname.value;
		let lastName = target.streqformlastname.value;
		let userEmail = target.streqformemail.value;
		
		let requesteeId = RequesteeList.insert({
			fname: firstName,
			lname: lastName,
			email: userEmail,
			classOf: "",
			verified: 0
		});
	
		let classes = [
			target.streqformclass1.value,
			target.streqformclass2.value,
			target.streqformclass3.value,
			target.streqformclass4.value,
			target.streqformclass5.value
		];
		let profs = [
			target.streqformprof1.value,
			target.streqformprof2.value,
			target.streqformprof3.value,
			target.streqformprof4.value,
			target.streqformprof5.value
		];

		for (var i = 0; i < classes.length; i++) {
			if (classes[i]) {//Checking Emptyness
				
				let requestedClassId;
				let requestedClass = ClassList.findOne({className: classes[i]});
				if (requestedClass)
				 	requestedClassId= requestedClass._id;
				
				if (!(requestedClassId)) { //Checking if class already exists
					requestedClassId = ClassList.insert({
						className: classes[i],
						profName: profs[i],
						profEmail: "",
						sendToProf: 0,
						classTerm: "",
						noteTakerId: "",
						noteTakerFirstName: "",
						noteTakerLastName: "",
						dateStarted: "",
						days: "",
						duration: "",
						durationTotal: "",
						status: 0,
					});
				}

				RequesteeClassList.insert({
					studentId: requesteeId,
					fname: firstName,
					lname: lastName,
					email: userEmail,
					classId: requestedClassId,
					className: classes[i],
					profName: profs[i],
					timestamp: '',
					activeStatus: 0,
				});
			}
		}

		Meteor.call('sendEmail',
				'kalyanranjanp@gmail.com',
				'asd@gmail.com',
				'How do you like me now?',
				createVerificationEmail(firstName, lastName, userEmail, requesteeId, secretWord)
				);

		FlowRouter.go('studentRequestConfirm');
	}
});