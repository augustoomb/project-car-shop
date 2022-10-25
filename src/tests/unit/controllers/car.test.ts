import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
import { carMock, carMockWithId, carMockForChange, carMockForChangeWithId } from '../../mocks/carMocks';
const { expect } = chai;

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request; 
  // o mesmo acontece com o segundo parâmetro
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create').resolves(carMock)
    sinon
      .stub(carService, 'read').resolves([carMockWithId])
    sinon
      .stub(carService, 'readOne').resolves(carMockWithId)
    sinon
      .stub(carService, 'delete').resolves(carMockWithId)
    sinon
      .stub(carService, 'update').resolves(carMockForChangeWithId)    

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('Create a car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  })
 
  describe('Read a car', () => {
    it('Success', async () => {
      req.params = { id: carMockWithId._id as string };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMock)).to.be.true;
    });
  })

  describe('Update a car', () => {
    it('Success', async () => {
      req.params = { id: '123' }
      req.body = carMock;

      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })

  // describe('Delete a car', () => {
  //   it('Success', async () => {
  //     req.params = { id: carMockWithId._id as string };

  //     await carController.delete(req, res);
  //     expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
  //     expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
  //   });
  // })

  describe('Read cars', () => {
    it('Success', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })
});