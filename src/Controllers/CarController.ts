import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

export default class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const newCar: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status || false,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };
    try {
      const car = await this.service.createCar(newCar);
      return this.res.status(201).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAllCars() {
    const cars = await this.service.getAllCars();
    return this.res.status(200).json(cars);
  }

  public async getCarById() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const car = await this.service.getCarById(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateCar() {
    const { id } = this.req.params;

    const { statusCode, body } = await this.service.updateCar(id, this.req.body);
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const car = await this.service.getCarById(id);
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(statusCode).json(body);
    } catch (error) {
      this.next(error);
    }
  }
}