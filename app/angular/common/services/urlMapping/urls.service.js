/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/
(function() {
    'use strict';

    class Urls {
        $get(){
            return {
                "rest": '__REST__/',
                "restURL": this.restURL,
                "user": {username: '__username__'}
            };
        }
    }

    angular
        .module('app.common')
        .provider('urls', Urls);
})();
