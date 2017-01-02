import { Template } from 'meteor/templating';

import { RequesteeList, ClassList, RequesteeClassList} from '../api/studentRequestColl.js';

import './verificationPage.html';

var secretWord = "myApp";

Template.verificationTemplate.helpers({
	// notVerifiedRedirect: function() {
	// 	//Notice and Redirect
	// 	return;
	// },

	verifyLink: function() {
		let vid = FlowRouter.getParam('verificationId');
		if (vid){
			let id = FlowRouter.getParam('verificationId').split("--");
			let userEmail = id[0]+"."+id[1];

			let user = RequesteeList.findOne({email: userEmail});
			if (!!user) {
				let uHash = CryptoJS.MD5(user.fname+user.lname+user._id.substring(10), secretWord).toString();

				if (id[2] == uHash) {
					RequesteeList.update(user._id, {
						$set: {verified: 1},
					});
					return "verified";
				}
			}
		}
		return "not Verified";		
	}
	});



// Template.postContent.onCreated(function() {
//   var template = this;
//   Tracker.autorun(function() {
//     template.subscribe('singlePost', FlowRouter.getParam('_id'));
//   });
// })

// Template.postContent.helpers({
//   postData: function() {
//     var post = Posts.findOne({_id: FlowRouter.getParam('_id')});
//     return post;
//   }
// })