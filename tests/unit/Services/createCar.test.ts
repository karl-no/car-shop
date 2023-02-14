import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import car from '../../mocks/car.mocks';

describe('Deveria cria um carro', function () {
  it('Deve criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(car.oneCar);

    const service = new CarService();
    const result = await service.createCar(car.oneCar);

    expect(result).to.be.deep.equal(car.oneCar);
  });
});