// import { expect } from 'chai';
// import { Model } from 'mongoose';
// import sinon from 'sinon';
// import MotorcycleService from '../../../src/Services/MotorcycleService';
// import motorcycleMock from '../../mocks/motorcycle.mocks';

// describe('Deveria cria uma motocicleta', function () {
//   it('Deve criar uma moto com sucesso', async function () {
//     sinon.stub(Model, 'create').resolves(motorcycleMock.oneMotorcycle);

//     const service = new MotorcycleService();
//     const result = await service.createMotorcycle(motorcycleMock.oneMotorcycle);

//     expect(result).to.be.deep.equal(motorcycleMock.oneMotorcycle);
//   });
// });