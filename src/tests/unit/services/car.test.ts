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
    sinon
      .stub(carModel, 'read').resolves()
    sinon
      .stub(carModel, 'readOne').resolves(carMockWithId)
  });

  after(()=>{
    sinon.restore();
  })

  describe('create car', () => {
    it('success', async () => {
      const carCreated = await carService.create(carMock);
      expect(carCreated).to.be.deep.equal(carMockWithId);
    });
  });

  describe('read cars', () => {
    it('success', async () => {
      const cars = await carService.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('read a car', () => {
    it('success', async () => {
      const car = await carService.readOne('6353edb3665f07130107f630');
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

});