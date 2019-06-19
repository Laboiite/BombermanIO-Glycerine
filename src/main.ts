import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { WsAdapter } from "@nestjs/platform-ws";
declare const module: any;

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: console,
  });
	app.useWebSocketAdapter(new WsAdapter(app));
	await app.listen(3000);

	if (module.hot) {
		module.hot.accept();
		module.hot.dispose(() => app.close());
	}
}
bootstrap();
