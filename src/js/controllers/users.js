angular
.module('mediaApp')
.controller('UsersIndexCtrl', UsersIndexCtrl)
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl)
.controller('UsersDeleteCtrl', UsersDeleteCtrl);


console.log('UsersCtrl');


UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;
  vm.all = User.query();
}

UsersShowCtrl.$inject = ['User', '$state', '$auth'];
function UsersShowCtrl(User, $state, $auth) {

  const vm = this;

  User.get($state.params, (user)=>{
    vm.user = user;
  });

  function usersDelete() {

    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go( 'mediaIndex' );
        // $uibModalInstance.close();
      });
  }

  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$state'];
function UsersEditCtrl(User, $state) {
  const vm = this;

  vm.user = User.get($state.params);

  function usersUpdate() {
    vm.user
    .$update()
    .then(() => $state.go('usersShow', $state.params));
  }

  vm.update = usersUpdate;
}

UsersDeleteCtrl.$inject = ['$uibModalInstance', 'currentUser', '$state', '$auth'];
function UsersDeleteCtrl($uibModalInstance, currentUser, $state, $auth) {
  const vm = this;
  vm.user = currentUser;

  function closeModal() {
    // $uibModalInstance.close();
    // console.log(currentUser.username);
  }

  vm.close = closeModal;

  function usersDelete() {

    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go( 'mediaIndex' );
        // $uibModalInstance.close();
      });
  }

  vm.delete = usersDelete;
}
