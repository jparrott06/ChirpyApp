function Verifyonclick() {

    return document.getElementById("signup").onclick = function () {
        location.href = "https://jparrott06.github.io/Assignment1-AkhtarParrott/verify.html";
    }
}
function ValidateForm(form)
{
    var FirstName = document.querySelector('#Fname');
    var FirstNameError = document.querySelector('#divFnameError');
    var valid = true;

    if(FirstName.value == "")
    {
        FirstNameError.classList.remove("invisible");
        FirstNameError.innerHTML = "First Name is a required field";
        document.getElementById('Fname').style.backgroundColor = "#800000";
        valid = false;
    }

    var FNameCheck = FirstName.value;
    if(/\d/.test(FNameCheck))
    {
        FirstNameError.classList.remove("invisible");
        FirstNameError.innerHTML = "First Name cannot contain number"
        document.getElementById('Fname').style.backgroundColor = "#800000";
        valid = false;
    }

    var LastName = document.querySelector('#Lname');
    var LastNameError = document.querySelector('#divLnameError');

    if(LastName.value == "")
    {
        LastNameError.classList.remove("invisible");
        LastNameError.innerHTML = "Last Name is a required field";
        document.getElementById('Lname').style.backgroundColor = "#800000";
        valid = false;
    }

    var LNameCheck = LastName.value;
    if(/\d/.test(LNameCheck))
    {
        LastNameError.classList.remove('invisible');
        LastNameError.innerHTML = "Last Name cannot contain number";
        document.getElementById('Lname').style.backgroundColor = "#800000";
        valid = false;
    }
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(format.test(FNameCheck))
    {
        console.log('punc error');
        FirstNameError.classList.remove("invisible");
        FirstNameError.innerHTML = "First Name cannot contain special chars"
        document.getElementById('Fname').style.backgroundColor = "#800000";
        valid = false;

    }

    if(format.test(LNameCheck))
    {
        LastNameError.classList.remove("invisible");
        LastNameError.innerHTML = "Last Name cannot contain special chars"
        document.getElementById('Lname').style.backgroundColor = "#800000";
        valid = false;

    }

    var Username = document.querySelector('#Uname');
    var UsernameError = document.querySelector('#divUnameError');

    if(Username == "")
    {
        UsernameError.classList.remove("invisible");
        UsernameError.innerHTML = "Username is a required field";
        document.getElementById('Uname').style.backgroundColor = "#800000";
        valid = false;
    }

    var Location = document.querySelector('#LoName');
    var LocationError = document.querySelector('#divLoNameError');
    var LocationCheck = Location.value;
    if(format.test(LocationCheck))
    {
        LocationError.classList.remove("invisible");
        LocationError.innerHTML = "Location cannot contain special chars";
        document.getElementById('LoName').style.backgroundColor = "#800000";
        valid = false;
    }
    if (/\d/.test(LocationCheck))
    {
        LocationError.classList.remove("invisible");
        LocationError.innerHTML = "Location cannot contain numbers";
        document.getElementById('LoName').style.backgroundColor = "#800000";
        valid = false;
    }

    var Email = document.querySelector('#EName');
    var EmailError = document.querySelector('#divENameError');
    if(Email == "")
    {
        EmailError.classList.remove("invisible");
        EmailError.innerHTML = "Email is a required field";
        document.getElementById('EName').style.backgroundColor = "#800000";
        valid = false;
    }
    var pattern =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    // var pass1 = document.querySelector('#pass1');
    // var pass2 = document.querySelector('#pass2');
    // var pass1Error = document.querySelector('#passerror1')
    // var pass2Error = document.querySelector('#passerror2');
    var pass1 = form.pass1.value;
    var pass2 = form.pass2.value;
    var error1 = document.querySelector("#txtpasserror1");
    var error2 = document.querySelector("#txtpasserror2");

    if(pass1.match(pattern) && pass2.match(pattern))
    {
        form.pass1.classList.remove("hasError");
    }
    else
    {
        error1.classList.remove("invisible");
        error1.innerHTML = "Error - one of your passwords does not meet requirements"
        form.pass1.style.backgroundColor = "#800000";
        form.pass1.classList.add("hasError");

        form.pass2.style.backgroundColor = "#800000";
        form.pass2.classList.add("hasError");

        valid = false;
    }

    if(pass1 != pass2)
    {
        error2.classList.remove("invisible");
        error2.innerHTML = "Passwords do not match"
        form.pass2.style.backgroundColor = "#800000";
        form.pass2.classList.add("hasError");
        valid = false;
    }
    else
    {
        form.pass1.classList.remove("hasError");
    }

    var DOB = document.querySelector("#txtDoB");
    var DOBError = document.querySelector("#doberror");
    if(DOB.value == "")
    {
        DOBError.classList.remove("invisible");
        DOBError.innerHTML = "Date of Birth cannot be empty"
        document.getElementById('txtDoB').style.backgroundColor = "#800000";
        valid = false;
    }
    var dobDate = new Date(form.txtDoB.value);
    var today = new Date();
    if (dobDate > today)
    {
        //alert(today);
        DOBError.classList.remove("invisible");
        DOBError.innerHTML = "Date of Birth must be before today";
        document.getElementById('txtDoB').style.backgroundColor = "#800000";
        valid = false;
    }

    var SecurityAnswer = document.querySelector('#txtAnswer');
    var SecurityAnswerError = document.querySelector('#divtxtAnswerError');

    if(SecurityAnswer.value == "")
    {
        SecurityAnswerError.classList.remove('invisible');
        SecurityAnswerError.innerHTML = "Answer cannot be empty";
        document.getElementById('txtAnswer').style.backgroundColor = "#800000";
        valid = false;
    }


//not adding in security question error since it cannot be emty
return valid;
}
// function ValidateForm(form) {
//     var DoB = document.querySelector('#txtDoB');
//     var errorr = document.querySelector("#doberror");
//     var datecheck = true;
//     if(DoB.value == "")
//     {
//         errorr.classList.remove("invisible");
//         errorr.innerHTML = "The Date of Birth cannot be empty."
//         document.getElementById('txtDoB').style.backgroundColor="#800000";
//         datecheck=false;
//     }
//     else
//     {
        
//         var dobdate = new Date(form.txtDoB.value);
//         var today = new Date();
//         if(dobdate > today || dobdate == today)
//         {
//             errorr.classList.remove("invisible");
//             errorr.innerHTML = "The Date of Birth must be before today's date."
//             document.getElementById('txtDoB').style.backgroundColor="#800000";
//             DoB.classList.add("hasError");
//             datecheck=false;
//         }
//         else{
//             errorr.classList.add("invisible");
//             errorr.innerHTML = "";
//             DoB.classList.remove("hasError");
//             //document.getElementById('txtDoB').style.backgroundColor="black";
//         }

//     }

//     var pass1 = form.pass1.value;
//     var pass2 = form.pass2.value;
//     var error1 = document.querySelector("#txtpasserror1");
//     var error2 = document.querySelector("#txtpasserror2");
//     var valid = true;

//     var pass_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
//     if (pass1.match(pass_regex) && pass2.match(pass_regex)) {
//         console.log(pass1 + "passed regex");
//         //form.pass1.style.backgroundColor="black";
//         valid = true;
//     }
//     else {
//         console.log(pass1 + " did not pass regex")
//         error1.classList.remove("invisible");
//         error1.innerHTML = "Error - password must contain at least one: lower-case letter, upper-case letter, and number."
//         form.pass1.classList.add("hasError");
//         form.pass1.style.backgroundColor='#800000'
//         //form.pass2.style.backgroundColor='#800000'

//         valid = false;
//     }
//     if (pass1 != pass2) {
//         error2.classList.remove("invisible");
//         error2.innerHTML = "The passwords do not match.";
//         // alert(form.pass2.classList)
//         var check = document.querySelector('#pass2');
//         check.classList.add("hasError");
//         //form.pass2.classList.add("hasError");
//         //alert(form.pass2.classList)
//         // document.getElementById('pass2').style.backgroundColor="yellow";
//         //alert("Error");
//         //     document.getElementById('txtdob').style.backgroundColor="yellow";
//         //alert ("\nPassword did not match: Please try again...")
//         //console.log()
//         check.style.backgroundColor="#800000";
// //        form.pass2.style.backgroundColor='#800000'
//         valid = false;
//     }
//     else {
//         // alert("else statement has run");
//         error2.classList.add("invisible");
//         form.pass2.classList.remove("hasError");
//         form.pass2.style.backgroundColor='black'
//         valid = true;
//     }
//     // alert("end of passwords match check[x]");

//     //Validate that password contains at least 1: lower-case letter, capital letter and number//


//     // Check for invalid input chars //

//     var bad_input = ['<', '>', '#', '-', '{', '}', '(', ')', "'", '"', '`'];
//     var elements = document.getElementsByTagName("input");
//     //alert(bad_input);

//     for (let i = 0; i < elements.length; i++) {

//         var errorDiv = String("div" + elements[i].id + "Error");
//         var errorDivlocation = document.getElementById(errorDiv);
//         var hasBoolError = new Boolean(false);

//        if (elements[i].type == 'text' || elements[i].type == 'email') {

//             //console.log(elements[i].type);

//             for (let j = 0; j < bad_input.length; j++) {

//                 if (elements[i].value.indexOf(bad_input[j]) != -1) {
//                     //console.log(elements[i].type + " contains bad input");
//                     //alert('bad!')
//                     errorDivlocation.classList.remove("invisible");
//                     errorDivlocation.innerHTML = "This field contains an invalid character: &,<,>,#,`,\" or ~";
//                     elements[i].classList.add("hasError");
//                     elements[i].style.backgroundColor='#800000';
//                     valid=false;
//                     hasBoolError=true;
//                    // console.log(elements[i].value);
//                 }

//             }
//             if (hasBoolError == false) {
//                 // alert(elements[i].id + " has no error");
//                 errorDivlocation.classList.add("invisible");
//                 form.elements[i].classList.remove("hasError");
//             }


//        }

//     }
//     if (valid == true && datecheck == true)
//     {
//         valid = true;
//     }
//     else
//     {
//         valid=false;
//     }



//     return valid;

// }

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