function Verifyonclick() {

    return document.getElementById("signup").onclick = function () {
        location.href = "https://jparrott06.github.io/Assignment1-AkhtarParrott/verify.html";
    }
}

function ValidateForm(form) {
    var pass1 = form.pass1.value;
    var pass2 = form.pass2.value;
    var error1 = document.querySelector("#txtpasserror1");
    var error2 = document.querySelector("#txtpasserror2");
    var valid = true;

    var pass_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    if (pass1.match(pass_regex) && pass2.match(pass_regex)) {
        console.log(pass1 + "passed regex");
        //form.pass1.style.backgroundColor="black";
        valid = true;
    }
    else {
        console.log(pass1 + " did not pass regex")
        error1.classList.remove("invisible");
        error1.innerHTML = "Error - password must contain at least one: lower-case letter, upper-case letter, and number."
        form.pass1.classList.add("hasError");
        form.pass1.style.backgroundColor='#800000'
        //form.pass2.style.backgroundColor='#800000'

        valid = false;
    }
    if (pass1 != pass2) {
        error2.classList.remove("invisible");
        error2.innerHTML = "The passwords do not match.";
        // alert(form.pass2.classList)
        var check = document.querySelector('#pass2');
        check.classList.add("hasError");
        //form.pass2.classList.add("hasError");
        //alert(form.pass2.classList)
        // document.getElementById('pass2').style.backgroundColor="yellow";
        //alert("Error");
        //     document.getElementById('txtdob').style.backgroundColor="yellow";
        //alert ("\nPassword did not match: Please try again...")
        //console.log()
        check.style.backgroundColor="#800000";
//        form.pass2.style.backgroundColor='#800000'
        valid = false;
    }
    else {
        // alert("else statement has run");
        error2.classList.add("invisible");
        form.pass2.classList.remove("hasError");
        form.pass2.style.backgroundColor='black'
        valid = true;
    }
    // alert("end of passwords match check[x]");

    //Validate that password contains at least 1: lower-case letter, capital letter and number//


    // Check for invalid input chars //

    var bad_input = ['<', '>', '#', '-', '{', '}', '(', ')', "'", '"', '`'];
    var elements = document.getElementsByTagName("input");
    //alert(bad_input);

    for (let i = 0; i < elements.length; i++) {

        var errorDiv = String("div" + elements[i].id + "Error");
        var errorDivlocation = document.getElementById(errorDiv);
        var hasBoolError = new Boolean(false);

       if (elements[i].type == 'text' || elements[i].type == 'email') {

            //console.log(elements[i].type);

            for (let j = 0; j < bad_input.length; j++) {

                if (elements[i].value.indexOf(bad_input[j]) != -1) {
                    //console.log(elements[i].type + " contains bad input");
                    //alert('bad!')
                    errorDivlocation.classList.remove("invisible");
                    errorDivlocation.innerHTML = "This field contains an invalid character: &,<,>,#,`,\" or ~";
                    elements[i].classList.add("hasError");
                    elements[i].style.backgroundColor='#800000';
                    valid=false;
                    hasBoolError=true;
                   // console.log(elements[i].value);
                }

            }
            if (hasBoolError == false) {
                // alert(elements[i].id + " has no error");
                errorDivlocation.classList.add("invisible");
                form.elements[i].classList.remove("hasError");
            }


       }

    }





    return valid;

}

function func() {
    $(document).ready(function () {
        $('#ddSecurityQuestion').on('change', function () {
            if (this.value == 'What was your high school mascot?') {
                $("#txtAnswer").show();
            }
            else if (this.value == 'Who is your favorite author?') {
                $("#txtAnswer").show();
            }
            else if (this.value == "What is your mother's maiden name?") {
                $("#txtAnswer").show();
            }
            else {
                $("#txtAnswer").hide();
            }

        });
    });
}