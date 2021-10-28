export const loggedInfo = (req, res, next) => {
    res.locals.loggedUser = req.cookies.logged_user;
    next();
}

export const requiresLogin = (req, res, next) => {
    if (typeof req.cookies.logged_user !== 'undefined') {
        return next();
    } else {
        return res.render('unauthorized');
    }
}