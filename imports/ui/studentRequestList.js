import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { RequesteeList, ClassList, RequesteeClassList } from '../api/studentRequestColl.js';

import './studentRequestList.html';
import './studentRequestList.css';

var sortReq = new ReactiveDict();

Template.studentRequestList.onCreated(function bodyOnCreated() {
  sortReq.set('sortRequestsBy', 1);
});

Template.studentRequestList.helpers({	
});

Template.studentRequestList.events({
	'click #byFirstName'(event, instance) {
		sortReq.set('sortRequestsBy', 1);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByName'});
	},

	'click #byLastName'(event, instance) {
		sortReq.set('sortRequestsBy', 2);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByName'});

	},

	'click #byClassName'(event, instance) {
		sortReq.set('sortRequestsBy', 3);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByClass'});
		
	},

	'click #byProfName'(event, instance) {
		sortReq.set('sortRequestsBy', 4);
		FlowLayout.render('mainContent', {main: 'studentRequestList', requestList: 'dispByClass'});
	},
});

Template.dispByName.helpers({
	requestsByName: function(instance) {
		let requestList = [];
		let students = [];
		if (sortReq.get('sortRequestsBy') == 1){
			students = RequesteeList.find({}, {sort: {fname: 1}}).fetch();
		} else if (sortReq.get('sortRequestsBy') == 2){
			students = RequesteeList.find({}, {sort: {lname: 1}}).fetch();
		}
		
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
		let classes = [];

		if (sortReq.get('sortRequestsBy') == 3){
			classes = ClassList.find({}, {sort: {className: 1}}).fetch();
		} else if (sortReq.get('sortRequestsBy') == 4){
			classes = ClassList.find({}, {sort: {profName: 1}}).fetch();
		}
	
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

