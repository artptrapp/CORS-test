const cors = require('cors')

class CorsConfig {
    allowedOrigins = ['http://localhost:3000', 'localhost:3000']
    IS_USING_CORS = true;

    getUsingCors = () => {
        return this.IS_USING_CORS
    }

    toggleCors(app) {
        if (this.IS_USING_CORS) {
            this.disableCors(app)
        } else {
            this.enableCors(app)
        }

        console.log(app._router.stack.length)
    }

    disableCors(app) {
        this.IS_USING_CORS = false
        this.allowedOrigins = ['http://localhost:3000', 'http://localhost:5000', 'localhost:3000', 'localhost:5000']
    }

    enableCors(app) {
        this.allowedOrigins = ['http://localhost:3000', 'localhost:3000']
        this.IS_USING_CORS = true
    }

    applyCors(app) {
        app.use((req, res, next) => {
            const origin = req.headers.origin || req.headers.host;
            if (this.allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            } else {
                return res.status(403).send('Forbidden')
            }
            res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            res.header('Access-Control-Allow-Credentials', true);
            return next();
        });
    }
}

const corsConfig = new CorsConfig();
exports.default = corsConfig