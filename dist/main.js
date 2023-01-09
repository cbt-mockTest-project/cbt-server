"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    const server = await app.listen(80);
    process.on('SIGINT', function () {
        server.close(function () {
            console.log('server closed');
            process.exit(0);
        });
    });
    console.log('go to graphql : http://localhost:80/graphql');
}
bootstrap();
//# sourceMappingURL=main.js.map