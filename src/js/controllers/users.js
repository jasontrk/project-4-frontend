angular
.module('mediaApp')
.controller('UsersIndexCtrl', UsersIndexCtrl)
.controller('UsersShowCtrl', UsersShowCtrl)
.controller('UsersEditCtrl', UsersEditCtrl)
.controller('UsersDeleteCtrl', UsersDeleteCtrl);


UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;
  vm.all = User.query();
}

UsersShowCtrl.$inject = ['User', '$stateParams', '$state', '$auth'];
function UsersShowCtrl(User, $stateParams, $state, $auth) {

  const vm = this;

  User.get($stateParams, (user)=>{
    vm.user = user;
  

  });

  // function openModal() {
  //   $uibModal.open({
  //     templateUrl: 'js/views/partials/userDeleteModal.html',
  //     controller: 'UsersDeleteCtrl as usersDelete',
  //     resolve: {
  //       currentUser: () => {
  //         return vm.user;
  //       }
  //     }
  //   });
  // }
  // vm.openModal = openModal;




}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
    .$update()
    .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}

UsersDeleteCtrl.$inject = ['$uibModalInstance', 'currentUser', '$state', '$auth'];
function UsersDeleteCtrl($uibModalInstance, currentUser, $state, $auth) {
  const vm = this;
  vm.user = currentUser;

  function closeModal() {
    $uibModalInstance.close();
    // console.log(currentUser.username);
  }

  vm.close = closeModal;

  function usersDelete() {

    vm.user
      .$remove()
      .then(() => {
        $auth.logout();
        $state.go( 'mediaIndex' );
        $uibModalInstance.close();
      });
  }

  vm.delete = usersDelete;
}
