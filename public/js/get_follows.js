$(document).ready(() => {
    $("#f1Users").click(event => {
        let $button = $(event.target),
            userId = $button.data("id");
            console.log("user_id: " + userId);
        $(".modal-body").html("");
        $.get(`/api/users/following`, {id : userId}, (results = {}) => {
            let data = results.data;
            console.log(data);
            if (!data || !data.following_users) return;
            data.following_users.forEach((following_user) => {
                console.log(following_user);
                $(".modal-body").append(
                    `<div class="post">
                    <div class="post__body">
                    <div class="post__header">
                    <div class="post__headerText">
                    <h3> ${following_user.following_users.FirstName} ${following_user.following_users.LastName} 
                    <span class="post__headerSpecial">@${following_user.following_users.Username}</span>
                    </h3>
                    </div>
                    <div class="post__headerDescription">
                    <center>
                    <p>${following_user.following_users.Bio}</p>
                    </center>
                    </div>
                    <button class="see-profile"><a href="/users/${following_user.following_users._id}">See Profile<a></button>
                    </div>
                    </div>
                    </div>`
                );
            });
        });
    });
});

$(document).ready(() => {
    $("#f2Users").click(event => {
        let $button = $(event.target),
            userId = $button.data("id");
        console.log("user_id: " + userId);
        $(".modal-body").html("");
        $.get(`/api/users/followers`, {id : userId}, (results = {}) => {
            let data = results.data;
            console.log(data);
            if (!data || !data.follower_users) return;
            data.follower_users.forEach((follower_user) => {
                $(".modal-body").append(
                    `<div class="post">
                    <div class="post__body">
                    <div class="post__header">
                    <div class="post__headerText">
                    <h3> ${follower_user.follower_users.FirstName} ${follower_user.follower_users.LastName} 
                    <span class="post__headerSpecial">@${follower_user.follower_users.Username}</span>
                    </h3>
                    </div>
                    <div class="post__headerDescription">
                    <center>
                    <p>${follower_user.follower_users.Bio}</p>
                    </center>
                    </div>
                    <button class="see-profile"><a href="/users/${follower_user.follower_users._id}">See Profile<a></button>
                    </div>
                    </div>
                    </div>`
                );
            });
        });
    });
});