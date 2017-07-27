angular
.module('mediaApp')
.controller('MainCtrl', MainCtrl);

console.log('MainCtrl');

MainCtrl.$inject = ['$rootScope', '$state', '$auth', '$transitions', 'User'];
function MainCtrl($rootScope, $state, $auth, $transitions, User) {
  const vm = this;

  vm.isNavCollapsed = true;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.message = err.data.message;
    if(err.status === 401) {
      if(vm.pageName !== 'login') vm.stateHasChanged = false;
      $state.go('login');
    } else if(err.status === 404) {
      vm.stateHasChanged = false;
      $state.go('productsIndex');
    }
  });

  $rootScope.$on('message', (e, message) => {
    vm.stateHasChanged = false;
    vm.message = message;
  });

  $transitions.onSuccess({}, (transition) => {
    vm.pageName = transition.$to().name;
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;

    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().id;
      User.get({ id: vm.currentUserId })
      .$promise
      .then((user) => {
        vm.currentUser = user;
      });
    }
  });

  function logout() {
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;


}
