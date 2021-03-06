var appControllers = angular.module('appControllers', []);

  // List Factory //

  angular.module('myApp').factory('List', function(){

        sessionStorage.transactions;
        sessionStorage.spent;

        // if there is no data, create an empty array //

        if(sessionStorage.transactions === undefined)
          var x = [];
        else
          var x = JSON.parse(sessionStorage.transactions);

        if(sessionStorage.spent === undefined)
          var y = [];
        else
          var y = JSON.parse(sessionStorage.spent);

        // functions //

      return {
        check: function(){
            return x;
        },
        spentcheck: function(){
           return y;
        },
        /* add a positive transaction */
        add: function(num, curr, date){
            x.push({amount: num, currency: curr, d: date});
            console.log("current array: " + x);
            sessionStorage.transactions = JSON.stringify(x);
            console.log("session_tran: " + sessionStorage.transactions);

        },
        /* add a minus transaction */
        minus: function(num, curr, date){
          y.push({amount: num, currency: curr, d: date});
          console.log("current array: " + y);
          sessionStorage.spent = JSON.stringify(y);

        },
        reset: function(){
          console.log("hello world");
          var x = [];
          var y = [];
        }
      };
  });


  // Wallet Factory/Model //

  angular.module('myApp').factory('Wallet', function(){

    if(sessionStorage.length == 0){
      sessionStorage.balance = 0.00;
    }
    else{
      sessionStorage.balance;
    }

    sessionStorage.currency = "gpb";
    var x;

    return {
        check_amount: function(){
          x = Number(sessionStorage.balance);
          return x;
        },
        add_amount: function(field){
          x += field;
          sessionStorage.balance = x;
          console.log("added amount: " + sessionStorage.balance);;
          return this.check_amount();
        },
        minus_amount: function(amount){
            x -= amount;
            sessionStorage.balance = x;
            console.log("added amount" + sessionStorage.balance);
            return this.check_amount();
        },
        correct_amount: function(amount){
          if((amount > x) || (x == 0) )
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
          sessionStorage.balance = 0.00;
          x = 0.00;
          console.log(sessionStorage.balance);
        },
        error: function(number){
          return angular.isNumber(number);
        }
    };
  });


  // List Controller //


  appControllers.controller('ListController',['$scope', 'Wallet', 'List', function($scope, Wallet, List){
      $scope.transactions = List.check();
      $scope.spent = List.spentcheck();
  }]);



  // Wallet Controller //

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

    $scope.balance = Wallet.check_amount();                     // current balance //

    $scope.add = function(){
      if(Wallet.error($scope.field)){                           // check if input is a number //
        $scope.balance = Wallet.add_amount($scope.field);       // add new amount to current amount //
        hidewarning();                                          // remove warning //
        List.add($scope.field, $scope.currency, new Date());    // add transaction to the transaction list //
        $scope.field = 0;                                       // reset input field to zero //
      }
      else{
        return false;
      }
    };

    $scope.minus = function(){
      if((Wallet.error($scope.Minusfield)) && (Wallet.correct_amount($scope.Minusfield))){   // check if input is a number, and that total is not beneath 0
        $scope.balance = Wallet.minus_amount($scope.Minusfield);                            // update balance
        hidewarning();
        List.minus($scope.Minusfield, $scope.currency, new Date());                         //add transaction
        $scope.Minusfield = 0;
      }
      else{
        showwarning();
        return false;
      }
    };

    $scope.reset = function(){
      $scope.balance = 0.00;
      Wallet.reset();
      List.reset();
    }


  }]);
