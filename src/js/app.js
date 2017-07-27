angular
  .module('mediaApp', ['ui.router', 'ngResource', 'satellizer', 'ngMessages', 'checklist-model', 'ui.bootstrap'])
  .constant('API_URL', 'http://localhost:3000/api');
