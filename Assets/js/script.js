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

//check that at least one chategory is chosen
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
  return (Math.random()*(upper-lower) << 0) + lower ;
}

// Fisher–Yates shuffle
String.prototype.shuffle = function () {
  var a = this.split(""),
      n = a.length;

  for(var i = n - 1; i > 0; i--) {
      var j = Math.random() * (i + 1) << 0;
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
  }
  return a.join("");
}

var generatePasswordWithOption = function(passwordOptions){
  
  var password = "";
  var typeIsUsed = {
    0: false,
    1: false,
    2: false,
    3: false,
    reset: function(){
      if(passwordOptions.hasLowerCase){
        this[0] = true;
      }
      if(passwordOptions.hasUpperCase){
        this[1] = true;
      }
      if(passwordOptions.hasNumeric){
        this[2] = true;
      }
      if(passwordOptions.hasSpecialChar){
        this[3] = true;
      }
    },

    allUsed: function(){
      if(this[0] == false &&
        this[1] == false &&
        this[2] == false &&
        this[3] == false){
          return true;
        }
        else{
          return false;
        }
    }
  };
  
  // pick a random key from available types
  var randomKey = function (obj) {
    var keys = Object.keys(obj);

    keys = keys.slice(0,4);
    for(var i = keys.length - 1; i >= 0; i--){
      if(obj[i] == false){
        keys.splice(i,1);
      }
    }

    return keys[keys.length * Math.random() << 0];
  };

  typeIsUsed.reset();
  
  for(var i = 0; i < passwordOptions.length; i++){
    //choose a random character type
    var index = randomKey(typeIsUsed);
    
    //then choose a random character from the chosen random type
    switch(index){
      case "0":
        var typeToChoose = lowerCasedCharacters;
        break;
      case "1":
        var typeToChoose = upperCasedCharacters;
        break;
      case "2":
        var typeToChoose = numericCharacters;
        break;
      case "3":
        var typeToChoose = specialCharacters;
        break;
      default:
        break;
    }
    
    //mark the used type to skip
    typeIsUsed[index] = false;
    
    //reset the types when all are used
    if(typeIsUsed.allUsed()){
      typeIsUsed.reset();
    }

    //concat the new character
    password = password + typeToChoose[generateRandomNumberBetween(0,typeToChoose.length)];
  }

  //shuffle the characters to increase randomness
  password = password.shuffle();
  
  return password;
}

var generatePassword = function(){
  var password = "";
  var passwordOptions = getPasswordOptions();
 
  if(isValidOption(passwordOptions)){
    //use password options to generate password
    password = generatePasswordWithOption(passwordOptions);
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
