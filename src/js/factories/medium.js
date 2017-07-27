angular
  .module('mediaApp')
  .factory('Medium', Medium);

console.log('Medium');

Medium.$inject = ['$resource', 'API_URL'];
function Medium($resource, API_URL) {
  return new $resource(`${API_URL}/media/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
