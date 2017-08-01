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
            label: 'lights.menu',
            restricted: false
        },
        {
            state: 'scenes',
            mdIconName: 'filter',
            label: 'scenes.menu',
            restricted: false
        },
        {
            state: 'settings',
            mdIconName: 'settings_remote',
            label: 'settings.menu',
            restricted: false
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
                          .primaryPalette('defaultpalette')
                          .accentPalette('defaultpalette');
    }

    // run
    function RunFn( $rootScope, $state, $translate, SUPPORTED_LANGUAGE, $mdColors ) {
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
        // $rootScope.$on(AppContext.USER_CHANGED_EVENT, () => {
        //     if($state.current && !$state.is('lights')) {
        //         $state.go('lights');
        //     }
        // });
    }

    // ---- HELPER(s) ----

    function setAngularMaterialPalette($mdThemingProvider) {
        $mdThemingProvider.definePalette('defaultpalette', {
            '50': 'e1f8ff',
            '100': 'b4efff',
            '200': '82e4ff',
            '300': '50d9ff',
            '400': '2bd0ff',
            '500': '05c8ff',
            '600': '04c2ff',
            '700': '04bbff',
            '800': '03b4ff',
            '900': '01a7ff',
            'A100': 'ffffff',
            'A200': 'f2faff',
            'A400': 'bfe6ff',
            'A700': 'a6dcff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '500',
                '600',
                '700',
                '800',
                '900'
            ]
        });
    }

})();
