FlowRouter.route('/',{
	action: function() {
		require('../imports/ui/studentRequest.js');
		BlazeLayout.render('mainContent', { main: 'studentRequestForm' } ); 
	},
	name: 'studentRequestHome'
});

FlowRouter.route('/received',{
	action: function() {
		require('../imports/ui/studentRequestConfirmation.js');
		BlazeLayout.render('mainContent', { main: 'studentRequestReceived' } ); 
	},
	name: 'studentRequestConfirm'
});