(function(){
    //Can also be an array of directives if we want to call generateValidatorFromArray instead

    var validateDirective = {
        directiveName: "isEqual",
        validationFunction: function(val, otherVal) {
            return {
                isEqual: val === otherVal
            };
        },
        validationStrings: {
            isEqual: "The value does not match"
        }
    };

    //We should name this validate.typeOfValidators.  I am using myApp in this example to just get a simple page working.
    var app = angular.module('validators.compare', ['validate']);

    app.run(function(validate){
        validate.generateValidatorFromObject(validateDirective);
    });
})();
