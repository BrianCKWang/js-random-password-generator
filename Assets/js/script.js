var generatePassword = function(){
  var password = "";

  //prompt pw length 8 <= len <= 128

  //prompt lowercase

  //prompt uppercase

  //prompt numeric

  //prompt special characters

  //check at least one chategory is chosen

  //generate password

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
