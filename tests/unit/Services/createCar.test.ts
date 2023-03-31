import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import carMock from '../../mocks/car.mocks';

describe('Deveria cria um carro', function () {
  it('Deve criar um carro com sucesso', async function () {
    sinon.stub(Model, 'create').resolves(carMock.oneCar);

    const service = new CarService();
    const result = await service.createCar(carMock.oneCar);

    expect(result).to.be.deep.equal(carMock.oneCar);
  });
  
  it('Não deve criar um carro', async function () {
    sinon.stub(Model, 'create').resolves(null);

    const service = new CarService();
    const result = await service.createCar(carMock.oneCar);

    expect(result).to.be.deep.equal(null);
  });
});