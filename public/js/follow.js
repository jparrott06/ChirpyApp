$(document).ready(() => {
    $("#follow-button").click(event => {
        let $button = $(event.target),
        userId = $button.data("id");

        $.get(`/api/users/${userId}/follow`, (results = {}) => {
            let data = results.data;
            console.log(data);
            if (data && data.success) {
                console.log("Follow Success");
                $button
                  .text("Unfollow")
                  //.removeId("follow-button")
                  //.addId("unfollow-button")
                  .attr('id', "unfollow-button")
            } else {
                console.log("Follow Error");
                $button.text("Try again")
            }
        });
    });

    $("#unfollow-button").click(event => {
        let $button = $(event.target),
        userId = $button.data("id");

        $.get(`/api/users/${userId}/unfollow`, (results = {}) => {
            let data = results.data;
            console.log(data);
            if (data && data.success) {
                $button
                  .text("Follow")
                //   .removeId("unfollow-button")
                //   .addId("follow-button")
                  .attr('id', "follow-button")
            } else {
                $button.text("Try again")
            }
        });
    });

});

//href="<%= `api/users/${chirp.user}/follow` %>"




//href="<%= `api/users/${chirp.user}/unfollow` %>"