import CarZodSchema, { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import IService from '../interfaces/IService';

class CarService implements IService<ICar> {
  private _CarModel:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._CarModel = model;
  }

  public async create(obj: unknown):Promise<ICar> {
    const parsedCar = CarZodSchema.safeParse(obj); // vendo se o obj é do tipo Car mesmo

    if (!parsedCar.success) {
      throw parsedCar.error;
    }

    return this._CarModel.create(parsedCar.data);
  }

  public async readOne(_id: string):Promise<ICar | null> {
    const car = await this._CarModel.readOne(_id);
    if (!car) throw new Error('Criar erro 1');
    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar | null> {
    const parsedCar = CarZodSchema.safeParse(obj); // vendo se o obj é do tipo Car mesmo

    if (!parsedCar.success) {
      throw parsedCar.error;
    }

    const car = await this._CarModel.update(_id, parsedCar.data);
    if (!car) throw new Error('Criar erro 2');
    return car;
  }

  public async read():Promise<ICar[]> {
    const cars = await this._CarModel.read();
    return cars;
  }

  public async delete(_id: string): Promise<ICar | null> {
    const car = await this._CarModel.delete(_id);
    if (!car) throw new Error('Criar erro 2');
    return car;
  }
}

export default CarService;
