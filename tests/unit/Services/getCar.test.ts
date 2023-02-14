import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import carMock from '../../mocks/car.mocks';

describe('Testa os endpoints para listar carros', function () {
  const { oneCar } = carMock;
  const { id } = oneCar;

  it('Testa a função de retornar todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(carMock.allCars);

    const service = new CarService();
    const result = await service.getAllCars();

    expect(result).to.be.deep.equal(carMock.allCars);
  });

  it('Testa a função de retornar um carro pelo id', async function () {
    sinon.stub(Model, 'findById').resolves(carMock.oneCar);

    const service = new CarService();
    const result = await service.getCarById(id);

    expect(result).to.be.deep.equal(carMock.oneCar);
  });

  afterEach(function () {
    sinon.restore();
  });
});