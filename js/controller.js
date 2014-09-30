var appControllers = angular.module('appControllers', []);


  /*******************
    * Wallet Factory/Model
  ***************************/

  angular.module('myApp').factory('Wallet', function(){

    var balance = 0.00;

    return {
        check_amount: function(){
          return balance;
        },
        add_amount: function(amount){
          balance += amount;
        },
        minus_amount: function(amount){
          if(this.correct_amount(amount))
            balance -= amount;
          else
            return false
        },
        correct_amount: function(amount){
          if((balance -= amount) > 0 )
            return false;
          else
            return true;
        },
        reset: function(){
          balance = 0.00;
        }
    };
  });


  /*************
  * Wallet Controller
  ********************/

  appControllers.controller('WalletController', ['$scope', 'Wallet', function($scope, Wallet){

    $scope.balance = Wallet.check_amount();


  }]);
