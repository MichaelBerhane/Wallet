var appControllers = angular.module('appControllers', []);


  /*******************
    * Wallet Factory/Model
  ***************************/

  angular.module('myApp').factory('Wallet', function(){

    var balance = 0.00;
    var currency = "gpb";

    return {
        check_amount: function(){
          return balance;
        },
        add_amount: function(field){
          balance += field;
          console.log(balance);
          return this.check_amount();
        },
        minus_amount: function(amount){

            balance -= amount;
            console.log(balance + ": minus");
            return this.check_amount();
        },
        correct_amount: function(amount){
          if((balance -= amount) > 0 )
            return false;
          else
            return true;
        },
        change_currency: function(selected){
          if(selected == 'USD'){
            currency = "usd";
          }
          else if(selected == 'EUR'){
            currency = "eur";
          }
          return currency;
        },
        currency: function(){
          return currency;
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

    $scope.gbpcurrency = true;
    $scope.usdcurrency = false;
    $scope.eurcurrency = false;
    $scope.field = 0.00;
    $scope.Minusfiled = 0.00;
    $scope.items = [{ id: 1, curr: 'USD' },
        { id: 2, curr: 'GBP' },
        { id: 3, curr: 'EUR'}];

    $scope.balance = Wallet.check_amount();

    $scope.add = function(){

      $scope.balance = Wallet.add_amount(Number($scope.field));
    };

    $scope.minus = function(){
      $scope.balance = Wallet.minus_amount(Number($scope.Minusfield));
    };



  }]);
