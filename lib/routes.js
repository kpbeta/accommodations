FlowRouter.route('/',{
	action: function() {
		require('../imports/ui/studentRequest.js');
		BlazeLayout.render('mainBody', { main: 'studentRequestForm' } ); 
	},
	name: 'studentRequestForm'
});