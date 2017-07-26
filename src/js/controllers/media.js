angular
  .module('mediaApp')
  .controller('MediaIndexCtrl', MediaIndexCtrl)
  .controller('MediaNewCtrl', MediaNewCtrl)
  .controller('MediaShowCtrl', MediaShowCtrl);

MediaIndexCtrl.$inject = ['Medium', 'tmdb', '$state'];
function MediaIndexCtrl(Medium, tmdb, $state) {
  const vm = this;

  vm.all = Medium.query();

  function searchMedia(){
    tmdb.getMovies(vm.medium)
    .then((response) => {
      vm.media = response.results;
      console.log(response);

    });
  }
  vm.searchMedia = searchMedia;

  function viewMedium(medium){
    const newMedium = {
      tmdb_id: medium.id,
      name: medium.title,
      overview: medium.overview,
      poster_path: medium.poster_path,
      first_air_date: medium.first_air_date,
      release_date: medium.release_date
    };

    console.log('The medium I want to save:', newMedium);

    Medium
      .save(newMedium)
      .$promise
      .then((savedMedium) => {
        console.log('The saved movie in our DB:', savedMedium);
        vm.media = [];
        $state.go('mediaShow', { id: savedMedium.id });
      });
  }

  vm.viewMedium = viewMedium;
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


MediaShowCtrl.$inject = ['Medium', '$stateParams'];
function MediaShowCtrl(Medium, $stateParams) {
  const vm = this;

  Medium.get($stateParams)
  .$promise
  .then((medium) => {
    vm.medium = medium;
  });
}
