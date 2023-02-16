import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IHttpResponse from '../Interfaces/IHttpResponse';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const allMotorcycles = await motorcycleODM.findAll();
    const motorcycles = allMotorcycles.map((moto) => this.createMotorcycleDomain(moto));
    return motorcycles;
  }

  public async getMotorcycleById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateMotorcycle(
    id: string,
    motorcycle: IMotorcycle,
  ): Promise<IHttpResponse<Motorcycle | string>> {
    const motorcycleODM = new MotorcycleODM();
    const motorcycleUpdate = await motorcycleODM.update(id, motorcycle);

    if (motorcycleUpdate === null) throw new Error('Motorcycle not found');

    const newMotorcycle = this.createMotorcycleDomain(motorcycleUpdate);

    return {
      statusCode: 200,
      body: newMotorcycle as Motorcycle,
    };
  }
}
