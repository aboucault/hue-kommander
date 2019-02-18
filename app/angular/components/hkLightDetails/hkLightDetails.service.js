/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/

(function() {
    'use strict';

    angular
        .module('hk.light.details')
        .factory('hkLightDetailsService', hkLightDetailsService);

    /* @ngInject */
    function hkLightDetailsService(geometryService) {

        let service = {
            colorGamutChecker: colorGamutChecker
        };
        return service;

        // ---- SERVICE(s) ----

        function colorGamutChecker(pointP, pointA, pointB, pointC) {
            if(geometryService.isPointInTriangle(pointP, pointA, pointB, pointC) === true) {
                return pointP;
            }
            // project P on each side of the triangle
            let Pab = geometryService.orthogonalProjection(pointP, pointA, pointB);
            let Pac = geometryService.orthogonalProjection(pointP, pointA, pointC);
            let Pbc = geometryService.orthogonalProjection(pointP, pointB, pointC);
            // get the distance between each projection and the original point to test
            let distances = [geometryService.vector2D(pointP, Pab), geometryService.vector2D(pointP, Pac), geometryService.vector2D(pointP, Pbc)];
            let shorterDistance = getShorterDistance(distances);
            // check on which side of the triangle the nearest projection is
            let chosenSegmentPoints;
            let projectedPoint;
            switch (shorterDistance) {
                case distances[0]:
                    chosenSegmentPoints = [pointA, pointB];
                    projectedPoint = Pab;
                    break;
                case distances[1]:
                    chosenSegmentPoints = [pointA, pointC];
                    projectedPoint = Pac;
                    break;
                case distances[2]:
                    chosenSegmentPoints = [pointB, pointC];
                    projectedPoint = Pbc;
                    break;
            }
            // check if the projection is on the segment of the chosen side of the triangle
            if(geometryService.isPointOnSegment(projectedPoint, chosenSegmentPoints[0], chosenSegmentPoints[1])) {
                return projectedPoint;
            }
            // if not, use the nearest summit from the projected point
            distances = [geometryService.vector2D(projectedPoint, pointA), geometryService.vector2D(projectedPoint, pointB), geometryService.vector2D(projectedPoint, pointC)];
            shorterDistance = getShorterDistance(distances);
            // return the nearest point
            return getNearestPoint(shorterDistance, distances, pointA, pointB, pointC);
        }

        // ---- HELPER(s) ----

        function getShorterDistance(distances) {
            let shorterDistance;
            for(let i=0; i<distances.length+1; i++) {
                if(distances[i]<distances[i+1]) {
                    shorterDistance = distances[i];
                }
            }
            return shorterDistance;
        }

        function getNearestPoint(shorterDistance, distances, pointA, pointB, pointC) {
            let nearestPoint;
            switch (shorterDistance) {
                case distances[0]:
                    nearestPoint = pointA;
                    break;
                case distances[1]:
                    nearestPoint = pointB;
                    break;
                case distances[2]:
                    nearestPoint = pointC;
                    break;
            }
            return nearestPoint;
        }
    }
})();
