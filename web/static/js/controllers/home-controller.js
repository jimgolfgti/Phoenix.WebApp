class HomeController {
    constructor($scope) {
        $scope.test = "Hello World, from Angular!";
    }
}
HomeController.$inject = ["$scope"];

export default HomeController;
