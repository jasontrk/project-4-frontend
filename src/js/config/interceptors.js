angular
  .module('mediaApp')
  .config(Interceptors);

console.log('Interceptors');

Interceptors.$inject = ['$httpProvider'];
function Interceptors($httpProvider) {
  $httpProvider.interceptors.push('ErrorHandler');
}
