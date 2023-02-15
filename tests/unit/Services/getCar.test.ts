import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
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

  it('getCarById retorna mensagem de erro se o carro não for encontrado', async function () {
    const RESULT_ERROR = 'Car not found';

    sinon.stub(Model, 'findById').resolves(id);

    try {
      const service = new CarService();
      await service.getCarById(id);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal(RESULT_ERROR);
    }
  });

  it('getCarById retorna mensagem de erro quando o id for inválido', async function () {
    const wrongId = carMock.invalidId;
    const RESULT_ERROR = 'Invalid mongo id';

    sinon.stub(Model, 'findById').resolves(wrongId);

    try {
      const service = new CarService();
      await service.getCarById(wrongId);
    } catch (error) {
      expect((error as Error).message).to.be.deep.equal(RESULT_ERROR);
    }
  });

  it('updateCar atualiza as informações de um carro', async function () {
    const carOutput: Car = new Car(oneCar);

    sinon.stub(Model, 'updateOne').resolves();
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const service = new CarService();
    const result = await service.updateCar(oneCar.id as string, oneCar);

    expect(result.body).to.be.deep.equal(carOutput);
  });

  afterEach(function () {
    sinon.restore();
  });
});