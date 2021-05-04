$(document).ready(() => {
    $(".modal-button").click(event => {
        let $button = $(event.target),
            hashtag = $button.data("id");
        console.log(hashtag);
        $(".modal-body").html("");
        $.get(`/api/chirps/hashtag/${hashtag}`, (results = {}) => {
            let data = results.data;
            console.log(data);
            if (!data || !data.hashChirps) return;
            data.hashChirps.forEach((hashChirp) => {
                $(".modal-body").append(
                    `<div class="post">
                    <div class="post__body">
                    <div class="post__header">
                    <div class="post__headerText">
                    <h3> ${hashChirp.userInfo.FirstName} ${hashChirp.userInfo.LastName} 
                    <span class="post__headerSpecial">@${hashChirp.userInfo.Username}</span>
                    </h3>
                    </div>
                    <div class="post__headerDescription">
                    <center>
                    <p>${hashChirp.chirpBody}</p>
                    </center>
                    </div>
                    </div>
                    </div>
                    </div>`
                );
            });
        });
    });
});


//   `<div>
//                     <span class="course-title">
//                     @${hashChirp.userInfo.Username}
//                     </span>
//                     <span class="course-cost">${hashChirp.userInfo.FirstName} ${hashChirp.userInfo.LastName}</span>
//                     <div class="course-description">
//                     ${hashChirp.chirpBody}
//                     </div>
//                     </div>`