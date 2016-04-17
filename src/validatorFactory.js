


(function(){
    var module = angular.module('validate', []);

    module.config(function($compileProvider) {
        module.compileProvider = $compileProvider;
    });
    
    //TODO: Need to put the obj.validationStrings into a scope
    var generateValidatorFromObject = function(obj) {
        if(!obj || !obj.hasOwnProperty('directiveName') || !obj.hasOwnProperty('validationFunction') || !obj.hasOwnProperty('validationStrings') ){
            console.error("Failed to generate validator for: ", obj);
            return;
        }
        module.compileProvider.directive(obj.directiveName, function(){
            var attributeBinding = "=" + obj.directiveName;
     
            return {
                require: 'ngModel',
                scope: {
                    validationValue: attributeBinding
                },
                link: function(scope, elem, attr, ngModel) {
                    //For DOM -> model validation
                    ngModel.$parsers.unshift(function(value) {
                        var validationObject = obj.validationFunction(ngModel.$viewValue, scope.validationValue),
                            isValid = true;
     
                        angular.forEach(validationObject, function(value, key){
                            ngModel.$setValidity(key, value);
                            isValid = isValid && value;
                        });
     
                        return isValid ? value : undefined;
                    });
     
                    //For model -> DOM validation
                    ngModel.$formatters.unshift(function(value) {
                        var validationObject = obj.validationFunction(ngModel.$viewValue, scope.validationValue);
     
                        angular.forEach(validationObject, function(value, key){
                            ngModel.$setValidity(key, value);
                        });
     
                        return value;
                    });
                }
            };
        });
    };

    var generateValidatorFromArray = function(validatorArray) {
        for(var x = 0; x < validatorArray.length(); x++){
            generateDirectiveFromObject(validatorArray[x]);
        }
    };

    var validate = function() {
        return {
            generateValidatorFromObject: generateValidatorFromObject,
            generateValidatorFromArray: generateValidatorFromArray
        };
    };

    module.factory("validate", validate);
})();
