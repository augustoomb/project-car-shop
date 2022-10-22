import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMocks';
import CarModel from '../../../models/CarModel';

describe('Car model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);

    sinon
      .stub(Model, 'find')
      .resolves([carMockWithId]);
  });

  after(()=>{
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching all cars', () => {
    it('successfully found', async () => {
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal([carMockWithId]);
    });
  });

});