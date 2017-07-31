/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function () {
    'use strict';

    angular
        .module('app')
        .config(ConfigureApp)
        .constant('SUPPORTED_LANGUAGE', ['fr-FR', 'en-US'])
        .run(RunFn);


    /* @ngInject */
    function ConfigureApp ( $httpProvider, $mdDateLocaleProvider, $mdThemingProvider, $translateProvider, $urlRouterProvider, $compileProvider,
    $translatePartialLoaderProvider, navigationMenuServiceProvider, urlsProvider ) {
        // Default routing
        $urlRouterProvider.otherwise('/lights');

        // Interceptors
        $httpProvider.interceptors.push('httpErrorsInterceptor');
        // Visual loaders
        $httpProvider.interceptors.push('processingRequestsHttpInterceptor');
        $httpProvider.interceptors.push('contextReplacementInterceptor');
        $httpProvider.interceptors.push('languageHeaderInterceptor');

        // Menu
        navigationMenuServiceProvider.setMenuItems([{
            state: 'lights',
            mdIconName: 'lightbulb_outline',
            label: 'lights.menu'
        },
        {
            state: 'scenes',
            mdIconName: 'filter',
            label: 'scenes.menu'
        },
        {
            state: 'settings',
            mdIconName: 'settings_remote',
            label: 'settings.menu'
        }]);

        // Set up API URL
        urlsProvider.restURL = 'http://192.168.1.56/api/__username__/';

        // Transalation
        $translateProvider.useSanitizeValueStrategy('sanitize');
        $translateProvider.preferredLanguage('en-US');
        $translateProvider.useLoader('$translatePartialLoader', {urlTemplate: '{part}.{lang}.json'});

        // Optimization TODO set to false when going to PROD
        $compileProvider.debugInfoEnabled(true);

        $translatePartialLoaderProvider.addPart('angular/app.translations');

        // $mdDateLocaleProvider.formatDate = (date) => date ? moment(date).format('DD.MM.YYYY') : '';
        //
        // $mdDateLocaleProvider.parseDate = (dateStr) => {
        //     moment(dateStr, ['DD.MM.YYYY', 'DD/MM/YYYY']).toDate();
        // };

        setAngularMaterialPalette($mdThemingProvider);

        $mdThemingProvider.theme('default')
                          .primaryPalette('paletteTest')
                          .accentPalette('paletteTest');
    }

    // run
    function RunFn( $rootScope, $state, $translate, SUPPORTED_LANGUAGE, $mdColors, AppContext ) {
        // $translate.use(SUPPORTED_LANGUAGE);
        $rootScope.$mdColors = $mdColors;

        $rootScope.$on('$stateChangeStart', function (evt, to, params) {
            // add redirectTo feature to ui-rooter
            // just add: redirectTo: 'state-you-want.toRedirect'
            if(to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo, params);
            }
        });

        $rootScope.$on('$stateChangeError', function(event) {
            // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
            event.preventDefault();
            console.error(event);
        });

        // Redirect to home page when user change
        $rootScope.$on(AppContext.USER_CHANGED_EVENT, () => {
            if($state.current && !$state.is('lights')) {
                $state.go('lights');
            }
        });
    }

    // ---- HELPER(s) ----

    function setAngularMaterialPalette($mdThemingProvider) {
        $mdThemingProvider.definePalette('paletteTest', {
            '50': 'e1f5fe',
            '100': 'b3e5fc',
            '200': '81d4fa',
            '300': '4fc3f7',
            '400': '29b6f6',
            '500': '0bc6fb',
            '600': '03a2f3',
            '700': '0298f1',
            '800': '028fef',
            '900': '017eec',
            'A100': 'fff',
            'A200': 'e0efff',
            'A400': 'add4ff',
            'A700': '93c7ff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300'],
            'contrastLightColors': undefined
        });
    }

})();
