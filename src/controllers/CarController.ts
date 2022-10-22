import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import IService from '../interfaces/IService';

export default class CarController {
  constructor(private _serviceCar: IService<ICar>) {}
  // refatorar!
  notFound = 'Object not found';
  size = 'Id must have 24 hexadecimal characters';

  public async create(
    req: Request,
    res: Response,
  ) {
    // const results = await this._serviceCar.create(req.body);
    // return res.status(201).json(results);
    try {
      const results = await this._serviceCar.create(req.body);
      return res.status(201).json(results);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  public async read(
    req: Request,
    res: Response,
  ) {
    const results = await this._serviceCar.read();
    return res.status(200).json(results);
  }

  public async readOne(
    req: Request,
    res: Response,
  ) {
    try {
      const results = await this._serviceCar.readOne(req.params.id);
      if (!results) { 
        return res.status(400).json({ error: this.size });
      }
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json({ error: this.notFound });
    }
  }
  
  public async update(
    req: Request,
    res: Response,
  ) {
    try {
      if (Object.keys(req.body).length === 0) { 
        return res.status(400).json({ error: '' });
      }
      const results = await this._serviceCar.update(req.params.id, req.body);
      if (!results) { 
        return res.status(400).json({ error: this.size });
      }
      return res.status(200).json(results);
    } catch (error) {
      return res.status(404).json({ error: this.notFound });
    }
  }

  public async delete(
    req: Request,
    res: Response,
  ) {
    try {
      const results = await this._serviceCar.delete(req.params.id);
      if (!results) { 
        return res.status(400).json({ error: this.size });
      }
      return res.status(204).end();
    } catch (error) {
      return res.status(404).json({ error: this.notFound });
    }
  }
}
