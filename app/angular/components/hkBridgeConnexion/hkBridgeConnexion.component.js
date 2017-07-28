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
