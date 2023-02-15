import { NextFunction, Request, Response } from 'express';
// import { isValidObjectId } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const newMotorcycle: IMotorcycle = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity,
    };
    try {
      const motorcycle = await this.service.createMotorcycle(newMotorcycle);
      return this.res.status(201).json(motorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  // public async getAllCars() {
  //   const cars = await this.service.getAllCars();
  //   return this.res.status(200).json(cars);
  // }

  // public async getCarById() {
  //   const { id } = this.req.params;
  //   try {
  //     if (!isValidObjectId(id)) {
  //       return this.res.status(422).json({ message: 'Invalid mongo id' });
  //     }
  //     const car = await this.service.getCarById(id);
  //     if (!car) {
  //       return this.res.status(404).json({ message: 'Car not found' });
  //     }
  //     return this.res.status(200).json(car);
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }

  // public async updateCar() {
  //   const { id } = this.req.params;

  //   const { statusCode, body } = await this.service.updateCar(id, this.req.body);
  //   try {
  //     if (!isValidObjectId(id)) {
  //       return this.res.status(422).json({ message: 'Invalid mongo id' });
  //     }
  //     const car = await this.service.getCarById(id);
  //     if (!car) {
  //       return this.res.status(404).json({ message: 'Car not found' });
  //     }
  //     return this.res.status(statusCode).json(body);
  //   } catch (error) {
  //     this.next(error);
  //   }
  // }
}