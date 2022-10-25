import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Model } from 'mongoose';
import { carMock, carMockWithId, carMockForChange, carMockForChangeWithId } from '../../mocks/carMocks';
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

    sinon
      .stub(Model, 'findOne')
      .resolves(carMockWithId);

    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves(carMockForChangeWithId);

    sinon
      .stub(Model, 'findByIdAndDelete')
      .resolves(carMockWithId);
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

  describe('searching a car', () => {
    it('successfully found', async () => {
      const car = await carModel.readOne('6353edb3665f07130107f630');
      expect(car).to.be.deep.equal(carMockWithId);
    });
    it('id not found', async () => {
      try {
        await carModel.readOne('999idincorreto');
      } catch (error:any) {        
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('changing a car', () => {
    it('successfully changed', async () => {
      const car = await carModel.update('6353edb3665f07130107f630', carMockForChange);
      expect(car).to.be.deep.equal(carMockForChangeWithId);
    });
    it('id not found', async () => {
      try {
        await carModel.readOne('999idincorreto');
      } catch (error:any) {        
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

  describe('deleting a car', () => {
    it('successfully deletion', async () => {
      const car = await carModel.delete('6353edb3665f07130107f630');
      expect(car).to.be.equal(carMockWithId);
    });
    it('id not found', async () => {
      try {
        await carModel.readOne('999idincorreto');
      } catch (error:any) {        
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });
  });

});