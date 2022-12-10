import { EntityDto } from './entity.dto';

export class Entity {
  private params: Record<string, number>[];

  constructor(
    private readonly name: string,
    private readonly paramsSize: number = 20,
    private readonly maxValue: number = 1,
    private readonly minValue: number = -1,
  ) {}

  private fillParams(size: number): void {
    this.params = [];
    for (let i = 0; i < size; i++) {
      this.params.push({ [`param${i + 1}`]: this.genValue() });
    }
  }

  private genValue(): number {
    const value =
      this.minValue + Math.random() * (this.maxValue - this.minValue);
    return +value.toFixed(4);
  }

  public getDto(): EntityDto {
    this.fillParams(this.paramsSize);
    return {
      name: this.name,
      params: this.params,
    };
  }
}
