function formValidation() {

    var validForm = true;

    var pass1 = document.getElementById("newPassword");
    var pass2 = document.getElementById("newPasswordconfirm");
    var error1 = document.getElementById("divnewPasswordError1");
    var error2 = document.getElementById("divnewPasswordconfirmError1");


    // alert(pass1.value);
    // alert(pass2.value);
    // alert(error1);
    // alert(error2);

    if(pass1.value != "" && pass2.value != "") {

        // alert("passwords not blank");

    var pass_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    if (!pass1.value.match(pass_regex) || !pass2.value.match(pass_regex)) {
        
        error1.classList.remove("invisible");
        error1.innerHTML = "Error - password must contain be at least 8 characters, containing at least one: lower-case letter, upper-case letter, and number.";
        pass1.classList.add("hasError");

        validForm = false;
    }

    else if (pass1.value != pass2.value) {
        error1.classList.remove("invisible");
        error1.innerHTML = "Error - passwords must match";
        pass1.classList.add("hasError");

        validForm = false;
    }

    else {
        pass1.classList.remove("hasError");
        error1.classList.add("invisible");
    }

    }

    var cpass = document.getElementById("Password");
    var cpasserr = document.getElementById("divPasswordError1");

    if (!cpass.value.match(pass_regex)) {
        cpasserr.classList.remove("invisible");
        cpasserr.innerHTML = "Error - password must contain be at least 8 characters, containing at least one: lower-case letter, upper-case letter, and number.";
        cpass.classList.add("hasError");

        validForm = false;
    }

    else {
        cpass.classList.remove("hasError");
        cpasserr.classList.add("invisible");
    }




    //3) There are no invalid chars (&, <, >, #, !, `, ", ~") in any field

    //alert("before get elements by tag name");
    var elements = document.getElementsByTagName("input");
    var invalidChars = ['<', '>', '`', '"'];
    //alert("after get element by tag name");
    for (let i = 0; i < elements.length; i++) {

        // alert(elements[i].id);
        var errorDiv = String("div" + elements[i].id + "Error");
        var errorDivlocation = document.getElementById(errorDiv);
        var hasError = new Boolean(false);
        // alert(errorDiv);
        // alert(errorDivlocation);
        //alert("in outer for loop");

        for (let j = 0; j < invalidChars.length; j++) {
            //alert("inner for loop");
            if (elements[i].value.indexOf(invalidChars[j]) != -1) {
                //alert(errorDivlocation.id);
                errorDivlocation.classList.remove("invisible");
                errorDivlocation.innerHTML = "This field contains an invalid character: <,>,`,\"";
                elements[i].classList.add("hasError");
                validForm = false;
                hasError = true;
                // alert(elements[i].id + " : " + hasError);
            }
            
        }

        if (hasError == false) {
            // alert(elements[i].id + " has no error");
            errorDivlocation.classList.add("invisible");
            elements[i].classList.remove("hasError");
        }
        
    }


    //If any above validations fail - highlight the background of the element and show a corresponding message next to the box

    // alert(validForm);

    return validForm;
}