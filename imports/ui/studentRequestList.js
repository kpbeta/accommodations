import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { StudentRequestsLists } from '../api/studentRequestLists.js';

import './studentRequestList.html';
import './studentRequestList.css';

var sortByFname = 0;

Template.studentRequestList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.studentRequestList.helpers({
	requests() {
		const instance = Template.instance();
		if (instance.state.get('sortByFirstName')) {
			return StudentRequestsLists.find({}, {sort: {fname: 1}});	
		} else {
			return StudentRequestsLists.find({}, {sort:{lname: 1}});
		}
	}
});

Template.studentRequestList.events({
	'click #sortByFirstName'(event, instance) {
		instance.state.set('sortByFirstName', 1);
	},

	'click #sortByLastName'(event, instance) {
		instance.state.set('sortByFirstName', 0);

	}
});
