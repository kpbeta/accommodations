import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { RequesteeList, ClassList, RequesteeClassList } from '../api/studentRequestColl.js';

import './studentRequestList.html';
import './studentRequestList.css';

var sortByFname = 0;

Template.studentRequestList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('sortRequestsBy', 1);
});

Template.studentRequestList.helpers({	
});

Template.studentRequestList.events({
	'click #byFirstName'(event, instance) {
		instance.state.set('sortRequestsBy', 1);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByName'});
	},

	'click #byLastName'(event, instance) {
		instance.state.set('sortRequestsBy', 2);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByName'});

	},

	'click #byClassName'(event, instance) {
		instance.state.set('sortRequestsBy', 3);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByClass'});
		
	},

	'click #byProfName'(event, instance) {
		instance.state.set('sortRequestsBy', 4);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByClass'});
	},
});

Template.dispByName.helpers({
	requestsByName: function() {
		let requestList = [];
		// console.log(instance.state.get('sortRequestsBy'));		
		let students = RequesteeList.find().fetch();
		
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
});
Template.dispByClass.helpers({
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

