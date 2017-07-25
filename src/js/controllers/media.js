angular
  .module('mediaApp')
  .controller('MediaIndexCtrl', MediaIndexCtrl)
  .controller('MediaNewCtrl', MediaNewCtrl);

MediaIndexCtrl.$inject = ['Medium'];
function MediaIndexCtrl(Medium) {
  const vm = this;

  vm.all = Medium.query();
}

MediaNewCtrl.$inject = ['Medium', 'User', '$state'];
function MediaNewCtrl(Medium, User, $state) {
  const vm = this;
  vm.medium = {};
  vm.users = User.query();

  function mediaCreate() {
    Medium
      .save(vm.medium)
      .$promise
      .then(() => $state.go('MediaIndex'));
  }

  vm.create = mediaCreate;
}
