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