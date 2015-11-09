import HomeController from './controllers/home-controller'
var moduleName = 'webepp';

var app = angular.module(moduleName, []);



app.controller("homeController", HomeController);

export default moduleName;
