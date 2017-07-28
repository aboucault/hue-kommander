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
            '50': 'FEF4E0',
            '100': 'FDE4B3',
            '200': 'FBD380',
            '300': 'F9C14D',
            '400': 'F8B326',
            '500': '79e3ff',
            '600': 'F69E00',
            '700': 'F59500',
            '800': 'F38B00',
            '900': 'F17B00',
            'A100': '31AFD3',
            'A200': '2CA8CE',
            'A400': '259FC8',
            'A700': '1386B7',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300'],
            'contrastLightColors': undefined
        });
    }

})();
