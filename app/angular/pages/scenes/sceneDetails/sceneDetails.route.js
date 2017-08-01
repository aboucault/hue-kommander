/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/

    'use strict';

    angular
        .module('app.scenes.scene.details')
        .config(function($stateProvider) {
            $stateProvider
                .state('sceneDetails', {
                    parent: 'baseLayout',
                    url: '/scene/:sceneId',
                    resolve: {
                        sceneId: ($stateParams) => {
                            return $stateParams.sceneId;
                        }
                    },
                    templateUrl: 'angular/pages/scenes/sceneDetails/sceneDetails.html',
                    controller: 'SceneDetailsController',
                    controllerAs: 'sceneDetailsCtrl'
                });
        });
})();