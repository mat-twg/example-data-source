import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';

@Module({
  providers: [
    {
      provide: EntityService,
      useFactory: () => {
        return new EntityService();
      },
    },
  ],
  exports: [EntityService],
})
export class EntityModule {}
