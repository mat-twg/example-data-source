import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ZmqPubSubClient } from './zmq';
import { EntityService } from './entity/entity.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private readonly frequency: number;

  constructor(
    @Inject('APP_SERVICE') private readonly publisher: ZmqPubSubClient,
    private readonly entityService: EntityService,
    private readonly configService: ConfigService,
  ) {
    this.frequency = configService.get('SERVICE_FREQUENCY') || 1000;
  }

  onApplicationBootstrap(): any {
    this.publisher.bind();
    this.start();
  }

  start(): void {
    setInterval(async () => {
      this.publisher
        .send(
          'data-source',
          JSON.stringify(this.entityService.getRandomEntity().getDto()),
        )
        .subscribe();
    }, this.frequency);
  }
}
