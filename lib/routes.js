const publicRoutes = FlowRouter.group({name: 'public_routes'});
const adminRoutes = FlowRouter.group({name: 'admin_routes'});

publicRoutes.route('/',{
	action: function() {
		require('../imports/ui/studentRequest.js');
		FlowLayout.render('mainContent', { main: 'studentRequest' });
	},
	name: 'studentRequestHome'
});
publicRoutes.route('/received',{
	action: function() {
		require('../imports/ui/studentRequestConfirmation.js');
		FlowLayout.render('mainContent', { main: 'studentRequestReceived'});
	},
	name: 'studentRequestConfirm'
});
publicRoutes.route('/login',{
	action: function() {
		require('../imports/ui/loginPage.js');
		FlowLayout.render('mainContent', { main: 'loginTemplate' });
	},
	name: 'loginPage'
});

adminRoutes.route('/requestlist',{
	action: function() {
		require('../imports/ui/studentRequestList.js');
		FlowLayout.render('mainContent', { main: 'studentRequestList' });
	},
	name: 'studentRequestList'
});

