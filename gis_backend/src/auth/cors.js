const configCORS = (router, allowedOrigin) => {
    router.use((req, res, next) => {
        res.set({
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Credentials": "true"
        });
        if (req.method === "OPTIONS") {
            res.set({ "Access-Control-Allow-Headers": "Content-Type" });
            return res.end();
        }
        next();
    });
};

module.exports.configCORS = configCORS;