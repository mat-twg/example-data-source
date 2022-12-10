import { Injectable, OnModuleInit } from '@nestjs/common';
import { Entity } from './entity';

@Injectable()
export class EntityService implements OnModuleInit {
  private readonly pool: Entity[] = [];

  constructor(private readonly poolSize: number = 20) {}

  onModuleInit(): any {
    this.fillPool(this.poolSize);
  }

  private fillPool(size: number): void {
    for (let i = 0; i < size; i++) {
      this.pool.push(new Entity(`Entity${i + 1}`));
    }
  }

  public getRandomEntity(): Entity {
    return this.pool[Math.floor(Math.random() * this.poolSize)];
  }
}
