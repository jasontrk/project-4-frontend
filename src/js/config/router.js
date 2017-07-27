angular
.module('mediaApp')
.config(Router);

console.log('Router');

Router.inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/js/views/static/home.html'
  })
  .state('mediaIndex', {
    url: '/media',
    templateUrl: '/js/views/media/index.html',
    controller: 'MediaIndexCtrl as mediaIndex'
  })
  .state('mediaShow', {
    url: '/media/:id',
    templateUrl: 'js/views/media/show.html',
    controller: 'MediaShowCtrl as mediaShow'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/auth/login.html',
    controller: 'LoginCtrl as login'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/auth/register.html',
    controller: 'RegisterCtrl as register'
  })
  .state('usersIndex', {
    url: '/users',
    templateUrl: 'js/views/users/index.html',
    controller: 'UsersIndexCtrl as usersIndex'
  })
  .state('usersShow', {
    url: '/users/:id',
    templateUrl: 'js/views/users/show.html',
    controller: 'UsersShowCtrl as usersShow'
  })
  .state('usersEdit', {
    url: '/users/:id/edit',
    templateUrl: 'js/views/users/edit.html',
    controller: 'UsersEditCtrl as usersEdit'
  });


  $urlRouterProvider.otherwise('/');

}
