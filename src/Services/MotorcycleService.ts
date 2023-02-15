import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
// import IHttpResponse from '../Interfaces/IHttpResponse';
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

  // public async getAllCars() {
  //   const carODM = new CarODM();
  //   const allCars = await carODM.findAllCars();
  //   const cars = allCars.map((car) => this.createCarDomain(car));
  //   return cars;
  // }

  // public async getCarById(id: string) {
  //   const carODM = new CarODM();
  //   const car = await carODM.findCarById(id);
  //   return this.createCarDomain(car);
  // }

  // public async updateCar(id: string, car: ICar): Promise<IHttpResponse<Car | string>> {
  //   const carODM = new CarODM();
  //   const carUpdate = await carODM.updateCar(id, car);

  //   if (carUpdate === null) throw new Error('Car not found');

  //   const newCar = this.createCarDomain(carUpdate);

  //   return {
  //     statusCode: 200,
  //     body: newCar as Car,
  //   };
  // }
}
