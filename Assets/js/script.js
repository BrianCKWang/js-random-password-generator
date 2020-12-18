// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

var getPasswordOptions = function(){
  var passwordOptions = {
    length: 0,
    hasLowerCase: false,
    hasUpperCase: false,
    hasNumeric: false,
    hasSpecialChar: false
  };

  //prompt pw length 8 <= len <= 128
  var passWordLength = 0;
  do{
    passWordLength = parseInt(prompt("Please enter length of password (between 8 to 128 inclusive): "));
    
    if(isNaN(passWordLength) === true){
      window.alert("Not a number!");
    }
    else if(passWordLength < 8 || passWordLength > 128){
      window.alert("Invalid length!");
    }
  }while(passWordLength < 8 || passWordLength > 128 || isNaN(passWordLength) === true);
  
  passwordOptions.length = passWordLength;
  //prompt lowercase
  passwordOptions.hasLowerCase = confirm(
    'Click OK to confirm including lowercase characters.'
  );
  //prompt uppercase
  passwordOptions.hasUpperCase = confirm(
    'Click OK to confirm including uppercase characters.'
  );
  //prompt numeric
  passwordOptions.hasNumeric = confirm(
    'Click OK to confirm including numbers.'
  );
  //prompt special characters
  passwordOptions.hasSpecialChar = confirm(
    'Click OK to confirm including special characters.'
  );

  return passwordOptions;
}

//check at least one chategory is chosen
var isValidOption = function(passwordOptions){
  var isValid = false;

  if(passwordOptions.hasLowerCase ||
     passwordOptions.hasUpperCase ||
     passwordOptions.hasNumeric   ||
     passwordOptions.hasSpecialChar){
      isValid = true;
  }

  return isValid;
}

var generateRandomNumberBetween = function(lower, upper){
  var value = 0;
  value = Math.random();
  value *= (upper-lower);
  value = Math.floor(value);

  return value;
}

var generatePasswordWithOption_method1 = function(passwordOptions){
  
  var password = "";
  var allCharacters = [];
  //concatenate all available characters into one array
  for(var i = 0; i < 5; i++){
    if(passwordOptions.hasLowerCase){
      allCharacters = allCharacters.concat(lowerCasedCharacters);
    }
    if(passwordOptions.hasUpperCase){
      allCharacters = allCharacters.concat(upperCasedCharacters);
    }
    if(passwordOptions.hasNumeric){
      allCharacters = allCharacters.concat(numericCharacters);
    }
    if(passwordOptions.hasSpecialChar){
      allCharacters = allCharacters.concat(specialCharacters);
    }
  }

  debugger;
  for(var i = 0; i < passwordOptions.length; i++){
    //generate a random number within array range
    //join characters
    var index = generateRandomNumberBetween(0,allCharacters.length);
    password = password + allCharacters[index];
  }

  return password;
}

var generatePasswordWithOption_method2 = function(passwordOptions){
  
  var password = "";
  var allCharacters = [];
  //concatenate all available characters into one array
  for(var i = 0; i < 5; i++){
    if(passwordOptions.hasLowerCase){
      allCharacters = allCharacters.concat(0);
    }
    if(passwordOptions.hasUpperCase){
      allCharacters = allCharacters.concat(1);
    }
    if(passwordOptions.hasNumeric){
      allCharacters = allCharacters.concat(2);
    }
    if(passwordOptions.hasSpecialChar){
      allCharacters = allCharacters.concat(3);
    }
  }

  debugger;
  for(var i = 0; i < passwordOptions.length; i++){
    //generate a random number within array range
    //join characters

    var index = allCharacters[generateRandomNumberBetween(0,allCharacters.length)];
    switch(index){
      case 0:
        var charToAdd = lowerCasedCharacters[generateRandomNumberBetween(0,lowerCasedCharacters.length)];
        break;
      case 1:
        var charToAdd = upperCasedCharacters[generateRandomNumberBetween(0,upperCasedCharacters.length)];
        break;
      case 2:
        var charToAdd = numericCharacters[generateRandomNumberBetween(0,numericCharacters.length)];
        break;
      case 3:
        var charToAdd = specialCharacters[generateRandomNumberBetween(0,specialCharacters.length)];
        break;
      default:
        break;
    }
    
    password = password + charToAdd;
  }

  return password;
}

var generatePassword = function(){
  var password = "";
  var passwordOptions = getPasswordOptions();
 
  if(isValidOption(passwordOptions)){
    //use password options to generate password
    password = generatePasswordWithOption_method2(passwordOptions);
  }
  else{
    window.alert("Must include at least one type of character!");
  }

  return password;
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
