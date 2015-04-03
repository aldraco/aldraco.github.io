//app.js

var app = angular.module('ToolsApp', ['wu.masonry'])
.controller('BricksCtrl', ['$scope', function($scope) {
	function genBrick() {
        var height = ~~(Math.random() * 500) + 100;
        var id = (Math.random() * 10000);
        return {
            src: 'http://lorempixel.com/230/' + height + '/abstract'
        };
    };

    $scope.bricks = [
        genBrick(),
        genBrick(),
        genBrick(),
        genBrick(),
        genBrick(),
        genBrick(),
        genBrick()
    ];

    $scope.add = function add() {
        $scope.bricks.push(genBrick());
    };

    $scope.remove = function remove() {
        $scope.bricks.splice(
            ~~(Math.random() * $scope.bricks.length),
            1
        )
    };


}]);