exports.showIndex = (req, res) => {
    res.render("index");
}

exports.showHome = (req, res) => {
    res.render("home");
}

exports.sendToSignup = (req, res) => {
    res.render("signup");
}

exports.sendToSignin = (req, res) => {
    res.render("signin");
}

exports.sendToVerification= (req, res) => {
    res.render("verify");
}