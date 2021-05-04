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
                    `<div>
                    <span class="course-title">
                    @${hashChirp.userInfo.Username}
                    </span>
                    <span class="course-cost">${hashChirp.userInfo.FirstName} ${hashChirp.userInfo.LastName}</span>
                    <div class="course-description">
                    ${hashChirp.chirpBody}
                    </div>
                    </div>`
                );
            });
        });
        });
    });