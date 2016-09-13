(function() {
  
  angular
    .module('clientApp')
    
    /// viewHome
    
    .directive('viewHome', function(){
      return{
        restrict: 'AE',
        scope: {
          key: '='
        },
        replace: false,
        //controller: 'clientCntrl_viewHome',
        templateUrl: '/app/core/views/view-home.html'
      };
    })
    
    /// viewApp -- Weather
    
    .directive('viewWeather', function(){
      return{
        restrict: 'AE',
        scope: {
          key: '='
        },
        replace: false,
        //controller: 'clientCntrl_viewWeather',
        templateUrl: '/app/core/views/view-weather.html'
      };
    })
    
    ;///
    
}());
