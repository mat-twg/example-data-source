import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { ZmqPubSubClient, ZmqSocketType } from './zmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: 'APP_SERVICE',
      useFactory: (configService: ConfigService) => {
        return new ZmqPubSubClient({
          address: configService.get('ZMQ_ADDRESS'),
          socket: {
            type: ZmqSocketType.PUB,
          },
          curve: {
            server: true,
            publicKey: configService.get('ZMQ_CURVE_PUBLIC_KEY'),
            secretKey: configService.get('ZMQ_CURVE_SECRET_KEY'),
          },
        });
      },
      inject: [ConfigService],
    },
    AppService,
  ],
})
export class AppModule {}
