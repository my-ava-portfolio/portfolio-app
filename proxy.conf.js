const PROXY_CONFIG = {
    "/resume-api": {
        "target": "https://oldportfolio.localhost",  // ✅ juste le host, sans path
        "secure": false,
        "changeOrigin": true,
        // pas de pathRewrite → /resume-api/users reste /resume-api/users
    },
    "/gtfs-api": {
        "target": "https://oldportfolio.localhost",
        "secure": false,
        "changeOrigin": true,
    },
    "/network-api": {
        "target": "https://oldportfolio.localhost",
        "secure": false,
        "changeOrigin": true,
    }
};

module.exports = PROXY_CONFIG;