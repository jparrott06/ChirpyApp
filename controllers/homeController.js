exports.showIndex = (req, res) => {
    res.render("index", {title: true});

}

exports.showHome = (req, res) => {
    res.render("home", {title: true});
}

exports.sendToSignup = (req, res) => {
    res.render("signup", {title: true});
}

exports.sendToSignin = (req, res) => {
    res.render("signin", {title: true});
}
