export function authorizationGuard(req, res, next) {
    if (!req.session.user) {
        return res.status(404).json({ message: "Access not permitted" });
    }
    next();
}
