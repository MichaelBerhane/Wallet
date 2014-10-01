var appControllers = angular.module('appControllers', []);


  angular.module('myApp').factory('List', function(){

      var transactions = [];

      return {
        check: function(){
          return transactions;
        },
        add: function(num, curr){
          transactions.push({amount: num, currency: curr});
        }
      };
  });





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
          if((amount > balance) || (balance == 0) )
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
        currency: function(inputted){
          currency = inputted;
          return currency;
        },
        reset: function(){
          balance = 0.00;
        },
        error: function(number){
          return angular.isNumber(number);
        }
    };
  });


  appControllers.controller('ListController',['$scope', 'Wallet', 'List', function($scope, Wallet, List){

      $scope.transactions = List.check();


  }]);



  /*************
  * Wallet Controller
  ********************/

  appControllers.controller('WalletController', ['$scope', 'Wallet', 'List', function($scope, Wallet, List){

    $scope.gbpcurrency = true;
    $scope.usdcurrency = false;
    $scope.eurcurrency = false;
    $scope.warning = 0;
    $scope.currency;

    var showwarning = function(){
      $scope.warning = 1;
    }

    var hidewarning = function(){
      $scope.warning = 0;
    }

    $scope.items = [{ id: 1, curr: 'USD' },
        { id: 2, curr: 'GBP' },
        { id: 3, curr: 'EUR'}];

    $scope.balance = Wallet.check_amount();

    $scope.add = function(){
      if(Wallet.error($scope.field)){
        $scope.balance = Wallet.add_amount($scope.field);
        hidewarning();
        List.add($scope.field, $scope.currency);
      }
      else{
        return false;
      }
    };

    $scope.minus = function(){
      if((Wallet.error($scope.Minusfield)) && (Wallet.correct_amount($scope.Minusfield))){
        $scope.balance = Wallet.minus_amount($scope.Minusfield);
        hidewarning();

      }
      else{
        showwarning();
        return false;
      }
    };



  }]);
