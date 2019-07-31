creeds.controller('battleController', ['$localStorage', '$rootScope', '$scope', '$http', 'apiConfig', 'webConfig', '$location', '$routeParams', function ($localStorage, $rootScope, $scope, $http, apiConfig, webConfig, $location, $routeParams) {

    // Set current page title
    $rootScope.pageTitle = "Creeds battle";

    // Get battle ID
    $scope.battleId = $routeParams.battleId;

    // Build battle URL - TODO
    $scope.battleUrl = webConfig["baseUrl"] + "creeds_website/src/#/battle/" + $routeParams.battleId;

    // Get current battle data
    getBattleData($scope.battleId);

    // Get current battle data
    function getBattleData(battleId) {
        $http({
            method: 'GET',
            url: apiConfig["baseUrl"] + apiConfig["battle"] + "/?id=" + battleId
        }).then(function successCallback(response) {
            $scope.battle = response.data.data[0];
            // Undefined data
            if (!$scope.battle) {
                $location.path("/");
            }
        }, function errorCallback(response) {
            $location.path("/");
        });
    }

}]);