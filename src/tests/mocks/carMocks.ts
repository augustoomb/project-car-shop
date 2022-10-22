import { ICar } from "../../interfaces/ICar";

const carMock: ICar = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "seatsQty": 2,
  "doorsQty": 2
};

const carMockWithId: ICar & { _id:String } = {
  "model": "Ferrari Maranello",
  "year": 1963,
  "color": "red",
  "buyValue": 3500000,
  "doorsQty": 2,
  "seatsQty": 2,
  "_id": "6353edb3665f07130107f630"
}

export {carMock, carMockWithId};
