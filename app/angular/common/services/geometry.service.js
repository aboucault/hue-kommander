/*Copyright (c) 2017 by North Korean Headquarters Inc, Grenoble.
This softaware is subject to copyright protection under the laws of France and other countries.
ALL RIGHTS RESERVED.*/

(function() {
    'use strict';

    angular
        .module('app.common')
        .factory('geometryService', geometryService);

    /* @ngInject */
    function geometryService() {

        let service = {
            point2D: point2D,
            vector2D: vector2D,
            orthogonalProjection: orthogonalProjection,
            isPointOnSegment: isPointOnSegment,
            isPointInTriangle: isPointInTriangle
        };
        return service;

        // ---- SERVICE(s) ----

        function point2D(x, y) {
            return {x: x, y:y};
        }

        function vector2D(pointA, pointB) {
            return {
                x: pointB.x - pointA.x,
                y: pointB.y - pointA.y,
                norm: Math.sqrt( Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2))
            };
        }

        /**
         * orthogonalProjection calculate the coordinates of the projection of a point on a vector
         * @param  {point2D} pointA an extremity of the vector
         * @param  {point2D} pointB an extremity of the vector
         * @param  {point2D} pointC the point to project
         * @return {point2D}        the coordinates of the projected point
         */
        function orthogonalProjection(pointA, pointB, pointC) {
            let AB = new vector2D(pointA, pointB);
            let u = ((pointC.x - pointA.x) * AB.x + (pointC.y - pointA.y) * AB.y) / AB.norm;
            let x = pointA.x + u * AB.x;
            let y = pointA.y + u * AB.y;
            return new point2D(x, y); //this is D
        }

        /**
         * isPointOnSegment tests if a given point is on a segment
         * @param  {point2D}  pointP the point to test
         * @param  {point2D}  pointA a segment extremity
         * @param  {point2D}  pointB a segment extremity
         * @return {Boolean}        [description]
         */
        function isPointOnSegment(pointP, pointA, pointB) {
            let AB = new vector2D(pointA, pointB);
            let AP = new vector2D(pointA, pointP);
            let PB = new vector2D(pointP, pointB);
            // check AB = AP + PB
            if(AB.norm === AP.norm + PB.norm) {
                return true;
            }
            return false;
        }

        /**
         * isPointInTriangle tests if a given point is in a triangle
         * @param  {point2D}  pointP the point to test
         * @param  {point2D}  pointA a triangle summit
         * @param  {point2D}  pointB a triangle summit
         * @param  {point2D}  pointC a triangle summit
         * @return {Boolean}        returns true if the point is in the triangle
         */
        function isPointInTriangle (pointP, pointA, pointB, pointC){
            var AC = new vector2D(pointA, pointC);
            var AB = new vector2D(pointA, pointB);
            var AP = new vector2D(pointA, pointP);

            var dot00 = (AC.x*AC.x) + (AC.y*AC.y);
            var dot01 = (AC.x*AB.x) + (AC.y*AB.y);
            var dot02 = (AC.x*AP.x) + (AC.y*AP.y);
            var dot11 = (AB.x*AB.x) + (AB.y*AB.y);
            var dot12 = (AB.x*AP.x) + (AB.y*AP.y);

            var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);

            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

            return ((u >= 0) && (v >= 0) && (u + v < 1));
        }

    }
})();
