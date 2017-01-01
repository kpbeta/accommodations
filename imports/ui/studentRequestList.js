import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { RequesteeList, ClassList, RequesteeClassList } from '../api/studentRequestColl.js';

import './studentRequestList.html';
import './studentRequestList.css';

var sortByFname = 0;

Template.studentRequestList.onCreated(function bodyOnCreated() {
  // this.state = new ReactiveDict();
});

Template.studentRequestList.helpers({
	// requests() {
	// 	const instance = Template.instance();
	// 	if (instance.state.get('sortByFirstName')) {
	// 		return StudentRequestsLists.find({}, {sort: {fname: 1}});	
	// 	} else {
	// 		return StudentRequestsLists.find({}, {sort:{lname: 1}});
	// 	}
	// }

	requestsByName: function() {
		let requestList = [];
		
		let students = RequesteeList.find().fetch();
		let classes = RequesteeClassList.find({studentId: students[0]._id}, {sort: {className: 1}}).fetch();
		
		for (var i = 0; i < students.length; i++) {
			let classes = RequesteeClassList.find({studentId: students[i]._id}, {sort: {className: 1}}).fetch();

			requestList.push({
				fname: students[i].fname,
				lname: students[i].lname,
				email: students[i].email,
				class: classes
			});
		}
		
		return requestList;
	},

	requestsByClass: function() {
		let requestList = [];
		let classes = ClassList.find().fetch();
		
		for (var i = 0; i < classes.length; i++) {
			let students = RequesteeClassList.find({classId: classes[i]._id}, {sort: {lname: 1}}).fetch();

			requestList.push({
				class: classes[i].className,
				prof: classes[i].profName,
				student: students
			});
		}

		return requestList;
	}
});

Template.studentRequestList.events({
	// 'click #sortByFirstName'(event, instance) {
	// 	instance.state.set('sortByFirstName', 1);
	// },

	// 'click #sortByLastName'(event, instance) {
	// 	instance.state.set('sortByFirstName', 0);

	// }
});
