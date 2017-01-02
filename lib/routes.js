/*---------Public Routes --------------*/
const publicRoutes = FlowRouter.group({name: 'public_routes'});

publicRoutes.route('/notFound', {name: 'pageNotFound',
	action: function(){
		FlowLayout.render('mainContent', {main: 'notFoundTemplate'});
	}
});
publicRoutes.route('/notAuthorized', { name: 'notAuthorizedPage',
	action: function() {
		require('../client/main.js');
		FlowLayout.render('mainContent', { main: 'notAuthorized' });
	}
});
	
publicRoutes.route('/login', { name: 'loginPage',
	action: function() {
		require('../imports/ui/loginPage.js');
		FlowLayout.render('mainContent', { main: 'loginTemplate' });
	}
});

publicRoutes.route('/', { name: 'studentRequestHome',
	action: function() {
		require('../imports/ui/studentRequest.js');
		FlowLayout.render('mainContent', { main: 'studentRequest' });
	}
});
publicRoutes.route('/received', { name: 'studentRequestConfirm',
	action: function() {
		require('../imports/ui/studentRequestConfirmation.js');
		FlowLayout.render('mainContent', { main: 'studentRequestReceived'});
	}
});

/*---------Logged-in Routes -----------*/
const loggedInRoutes = FlowRouter.group({
    triggersEnter: [
        function () {
            var route;
            if (!(Meteor.loggingIn() || Meteor.userId())) {
                
                // route = FlowRouter.current();
                // if (route.route.name !== 'loginPage') {
                //     Session.set('redirectAfterLogin', route.path);
                // }
                return FlowRouter.go('notAuthorizedPage');
            }
        }
    ]
});

loggedInRoutes.route('/requestlist', { name: 'studentRequestList',
	action: function() {
		require('../imports/ui/studentRequestList.js');
		FlowLayout.render('mainContent', { main: 'studentRequestList' });
	}
});

