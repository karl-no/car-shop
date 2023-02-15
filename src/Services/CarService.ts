import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IHttpResponse from '../Interfaces/IHttpResponse';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const allCars = await carODM.findAllCars();
    const cars = allCars.map((car) => this.createCarDomain(car));
    return cars;
  }

  public async getCarById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findCarById(id);
    return this.createCarDomain(car);
  }

  public async updateCar(id: string, car: ICar): Promise<IHttpResponse<Car | string>> {
    const carODM = new CarODM();
    const carUpdate = await carODM.updateCar(id, car);

    if (carUpdate === null) throw new Error('Car not found');

    const newCar = this.createCarDomain(carUpdate);

    return {
      statusCode: 200,
      body: newCar as Car,
    };
  }
}
