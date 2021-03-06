'use strict';

angular.module('project')
  .directive('modalProjectSchedule', directiveProjectSchedule)
  .directive('tmplProjectTombstone', directiveProjectTombstone)
  .directive('modalProjectImport', directiveModalProjectImport)
  .directive('tmplProjectInitiated', directiveProjectInitiated)
  .directive('tmplProjectActivities', directiveProjectActivities);

// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Modal Project Schedule
//
// -----------------------------------------------------------------------------------
function directiveProjectSchedule() {
  var directive = {
    restrict: 'E',
    templateUrl: 'modules/projects/client/views/project-partials/project-schedule.html',
    scope: {
      project: '='
    },
    controller: function($scope, ENV) {
      $scope.environment = ENV;
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Modal Project Entry
//
// -----------------------------------------------------------------------------------
directiveModalProjectImport.$inject = ['$uibModal', '$state', '$rootScope'];
/* @ngInject */
function directiveModalProjectImport($uibModal, $state, $rootScope) {
  var directive = {
    restrict:'A',
    scope : {
      project: '='
    },
    link : function(scope, element) {
      element.on('click', function() {
        var modalProjectEntry = $uibModal.open({
          animation: true,
          templateUrl: 'modules/projects/client/views/project-partials/modal-project-import.html',
          controller: 'controllerModalProjectImport',
          controllerAs: 'projectImport',
          resolve: {
            rProject: function () {
              return scope.project;
            }
          },
          size: 'lg'
        });
        modalProjectEntry.result.then(function (/* data */) {
          if ($state.current.name === 'projects') {
            // reload the complete projects list
            $rootScope.$broadcast('refreshProjectsList');
          } else {
            $rootScope.$broadcast('refreshProject');
            $rootScope.$broadcast('refreshDocumentList');
          }
        }, function () {});
      });
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Project Tombstone Horizontal
//
// -----------------------------------------------------------------------------------
function directiveProjectTombstone() {
  var directive = {
    restrict: 'E',
    templateUrl: 'modules/projects/client/views/project-partials/project-tombstone.html',
    scope: {
      project: '='
    },
    controller: function($scope) {
      $scope.tailingsImpoundments = parseInt($scope.project.tailingsImpoundments, 10) || 0;
    }
  };
  return directive;
}
// -----------------------------------------------------------------------------------
//
// DIRECTIVE: Project Initiated
// Used
//
// -----------------------------------------------------------------------------------
function directiveProjectInitiated() {
  var directive = {
    restrict: 'E',
    replace: true,
    templateUrl: 'modules/projects/client/views/project-partials/project-initiated.html'
  };
  return directive;
}

function directiveProjectActivities() {
  var directive = {
    restrict: 'E',
    templateUrl: 'modules/projects/client/views/project-partials/project-activities.html',
    controller: 'controllerProjectActivities',
    scope: {
      project: '='
    }
  };
  return directive;
}
