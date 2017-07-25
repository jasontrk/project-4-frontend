angular
  .module('mediaApp')
  .service('tmdb', Tmdb);

Tmdb.$inject = ['$http', 'API_URL'];
function Tmdb($http, API_URL) {
  const vm = this;

  function getMovies(movie) {
    return $http
      .get(`${API_URL}/movie`, { params: { movie } })
      .then((response) => {
        return response.data;
      });
  }

  vm.getMovies = getMovies;
}
