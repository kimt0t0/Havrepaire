import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from './pipes/validation.pipe';
// import * as csurf from 'csurf';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    // app.use(csurf());
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
