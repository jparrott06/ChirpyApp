// function func() {
//     // $("#ddSecurityQuestion option:last").attr("selected", "selected"); 
//     $(document).ready(function () {
//         $('#ddSecurityQuestion').on('change', function () {
//             if (this.value == 'What was your high school mascot?') {
//                 $("#txtAnswer").show();
//             }
//             else if (this.value == 'Who is your favorite author?') {
//                 $("#txtAnswer").show();
//             }
//             else if (this.value == "What is your mother's maiden name?") {
//                 $("#txtAnswer").show();
//             }
//             else {
//                 $("#txtAnswer").hide();
//             }

//         });
//     });
// }
// function test()
// {
//     $("#GenderQuestion option:last").attr("selected", "selected"); 
//     $("#ddSecurityQuestion option:last").attr("selected", "selected"); 
//     // $("#txtDoB").attr("value", "value"); 
// }

function ValidateForm()
{
    var FirstName = document.querySelector("#txtFirstName");
    var FirstNameError = document.querySelector("#divtxtFirstNameError");
    var hasNumber = /\d/;  
    var valid = true;

    if(FirstName.value == "")
    {
        FirstNameError.classList.remove("invisible");
        FirstNameError.innerHTML = "First Name is a required field"
        document.getElementById('txtFirstName').style.backgroundColor = "#800000";
        valid = false;
    }

    var check = FirstName.value;
    if(/\d/.test(check))
    {
        FirstNameError.classList.remove("invisible");
        FirstNameError.innerHTML = "First Name cannot contain number"
        document.getElementById('txtFirstName').style.backgroundColor = "#800000";
        valid = false;
    }

    var LastName = document.querySelector('#txtLastName');
    var LastNameError = document.querySelector("#divtxtLastNameError");
    if (LastName.value == "")
    {
       LastNameError.classList.remove("invisible");
       LastNameError.innerHTML = "Last Name is a required field"
       document.getElementById('txtLastName').style.backgroundColor = "#800000";
       valid = false;
    }

    var checkLast = LastName.value;
    if(/\d/.test(checkLast))
    {
        LastNameError.classList.remove("invisible");
        LastNameError.innerHTML = "Last Name cannot contain number"
        document.getElementById('txtLastName').style.backgroundColor = "#800000";
        valid = false;
    }
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(format.test(check))
    {
        FirstNameError.classList.remove("invisible");
        FirstNameError.innerHTML = "First Name cannot contain special chars"
        document.getElementById('txtFirstName').style.backgroundColor = "#800000";
        valid = false;

    }

    if(format.test(checkLast))
    {
        LastNameError.classList.remove("invisible");
        LastNameError.innerHTML = "Last Name cannot contain special chars"
        document.getElementById('txtLastName').style.backgroundColor = "#800000";
        valid = false;
    }

    var Location = document.querySelector('#txtLocation');
    var LocationError = document.querySelector('#divtxtLocationError');
    var checkLocation = Location.value;
    if(/\d/.test(checkLocation))
    {
        console.log('number');
        LocationError.classList.remove("invisible");
        LocationError.innerHTML = "Location cannot contain number";
        document.getElementById('txtLocation').style.backgroundColor = "#800000";
        valid = false;
    }
    if(format.test(checkLocation))
    {
        LocationError.classList.remove("invisible");
        LocationError.innerHTML = "Location cannot contain special chars"
        document.getElementById('txtLocation').style.backgroundColor = "#800000";
        valid = false;
    }

    var DOB = document.querySelector('#txtDoB');
    var DOBError = document.querySelector('#divtxtDOB');
    if(DOB.value == "")
    {
        DOBError.classList.remove("invisible");
        DOBError.innerHTML = "The Date of Birth cannot be empty";
        document.getElementById('txtDOB').style.backgroundColor = "#800000";
        valid = false
    }

    var dobDate = new Date(DOB.value);
    var today = new Date();
    if(dobDate >= today)
    {
        DOBError.classList.remove("invisible");
        DOBError.innerHTML = "The Date of Birth must be before today's date";
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

    // took this out since no question is not possible with our setup
    // var SecurityQuestion = document.querySelector('ddSecurityQuestion');
    // var SecurityQuestionError = document.querySelector('divtxtSecurityQuestionError');
    // if(SecurityQuestion.value = "")
    // {
    //     SecurityQuestionError.classList.remove("invisible");
    //     SecurityQuestionError.innerHTML = "Question cannot be empty";
    //     document.getElementById('ddSecurityQuestion').style.backgroundColor = "red";
    //     valid = false;
    // }

    // var UserName = document.querySelector('#txtUsername');
    // var UserNameError = document.querySelector('#divtxtUsernameError');
    // if(UserName.value = "")
    // {
    //     console.log('username issue');
    //     UserNameError.classList.remove('invisible');
    //     UserNameError.innerHTML = "Username cannot be empty";
    //     document.getElementById('txtUsername').style.backgroundColor = "red";
    //     valid = false;
    // }
    return valid;
}