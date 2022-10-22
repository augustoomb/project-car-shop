import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('create car', () => {
    it('success', async () => {
      const carCreated = await carModel.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
  });

});