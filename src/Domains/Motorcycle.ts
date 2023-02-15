import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';
import MotorcycleCategories from '../Utils/MotorcycleCategories';

export default class Motorcycle extends Vehicle {
  private category: MotorcycleCategories;
  private engineCapacity: number;

  constructor({
    id,
    model,
    year,
    color,
    status,
    buyValue,
    category,
    engineCapacity,
  }: IMotorcycle) {
    super({
      id,
      model,
      year,
      color,
      status,
      buyValue,
    });
    this.category = category;
    this.engineCapacity = engineCapacity;
  }

  public getCategory() {
    return this.category;
  }

  public setCategory(category: MotorcycleCategories) {
    this.category = category;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }

  public setEngineCapacity(engineCapacity: number) {
    this.engineCapacity = engineCapacity;
  }
}