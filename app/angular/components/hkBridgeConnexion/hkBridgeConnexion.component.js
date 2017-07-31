/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    /*
     * Widget to modify the settings of a given light
     */
    angular
        .module('hk.bridge.connexion', [])
        .component('hkBridgeConnexion', {
            templateUrl: 'angular/components/hkBridgeConnexion/hkBridgeConnexion.html',
            controller: HkBridgeConnexionController,
            controllerAs: 'hkBridgeConnexionCtrl',
            bindings: {}
        });

    function HkBridgeConnexionController() {
    }
})();
