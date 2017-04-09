/**
 * echarts-angular - angular directive for ECharts
 * @version v1.0.0
 * @link https://github.com/twp0217/echarts-angular#readme
 * @license MIT
 */
var echartsAngular = angular.module('echarts-angular', []);
echartsAngular.directive('echartsAngular', ['$window', function ($window) {
	
	var DEFAULT_THEME = "default";
	
	return {
		restrict: 'E',
		template: '<div></div>',
		scope: {
			theme: '@',
			option: '='
		},
		link: function ($scope, element, attrs) {
			var height = attrs.height || 400;
			var width = attrs.width || 'auto';
			var container = element.children()[0] || element[0];
			var chart = echarts.init(container, $scope.theme || DEFAULT_THEME, { 'height': height, 'width':width });

			$scope.$watch(attrs.option, function (option) {
				chart && chart.setOption(option);
			});

			angular.element($window).bind('resize', function () {
				chart && chart.resize();
			});
		}
	}
}]);