FlowRouter.route('/',{
	action: function() {
		require('../imports/ui/studentRequest.js');
		FlowLayout.render('mainContent', { main: 'studentRequest' } ); 
	},
	name: 'studentRequestHome'
});

FlowRouter.route('/received',{
	action: function() {
		require('../imports/ui/studentRequestConfirmation.js');
		FlowLayout.render('mainContent', { main: 'studentRequestReceived' } ); 
	},
	name: 'studentRequestConfirm'
});

FlowRouter.route('/requestlist',{
	action: function() {
		require('../imports/ui/studentRequestList.js');
		FlowLayout.render('mainContent', { main: 'studentRequestList' } ); 
	},
	name: 'studentRequestList'
});

