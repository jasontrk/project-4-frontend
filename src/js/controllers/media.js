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


MediaShowCtrl.$inject = ['Medium', '$stateParams', '$auth', 'User'];
function MediaShowCtrl(Medium, $stateParams, $auth, User) {
  const vm = this;
  vm.medium = {};
  vm.currentUser = User.get($auth.getPayload());

  Medium.get($stateParams)
  .$promise
  .then((medium) => {
    vm.medium = medium;
  });

  function toggleLike() {
    const index = vm.medium.like_ids.indexOf(vm.currentUser.id);
    const dislikeIndex = vm.medium.dislike_ids.indexOf(vm.currentUser.id);

    if(index > -1) {
      vm.medium.like_ids.splice(index, 1);
      vm.medium.likes.splice(index, 1);

    } else {
      vm.medium.like_ids.push(vm.currentUser.id);
      vm.medium.likes.push(vm.currentUser);
      console.log(vm.medium);
      if(dislikeIndex !== -1) vm.medium.dislike_ids.splice(dislikeIndex, 1);
      if(dislikeIndex !== -1) vm.medium.dislikes.splice(dislikeIndex, 1);
    }

    Medium
      .update({ id: vm.medium.id }, vm.medium)
      .$promise
      .then((medium) => console.log('liked or unliked medium', medium));
  }
  vm.toggleLike = toggleLike;

  function isLiked() {
    return $auth.getPayload() && vm.medium.$resolved && vm.medium.like_ids.includes(vm.currentUser.id)
    ;
  }

  vm.isLiked = isLiked;


  function toggleDislike() {
    const likeIndex = vm.medium.like_ids.indexOf(vm.currentUser.id);
    const dislikeIndex = vm.medium.dislike_ids.indexOf(vm.currentUser.id);

    if(dislikeIndex === -1) {
      vm.medium.dislike_ids.push(vm.currentUser.id);
      vm.medium.dislikes.push(vm.currentUser);
      if(likeIndex !== -1) vm.medium.like_ids.splice(likeIndex, 1);
      if(likeIndex !== -1) vm.medium.likes.splice(likeIndex, 1);
    } else {
      vm.medium.dislike_ids.splice(dislikeIndex, 1);
      vm.medium.dislikes.splice(dislikeIndex, 1);
    }

    Medium
      .update({ id: vm.medium.id }, vm.medium)
      .$promise
      .then((medium) => console.log('dislike or disliked medium', medium));
  }

  vm.toggleDislike = toggleDislike;

  function isDisliked() {
    return $auth.getPayload() && vm.medium.$resolved && vm.medium.dislike_ids.includes(vm.currentUser.id);
  }

  vm.isDisiked = isDisliked;
}
