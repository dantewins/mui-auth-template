const verifySession = (allowedRoles) => {
    return (req, res, next) => {
        if (req.session.user && allowedRoles.includes(req.session.user.role)) {
            return next();
        }

        return res.status(403).send({ message: "Unauthorized", status: "error" });
    };
};

module.exports = { verifySession };
