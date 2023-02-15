import IVehicle from './IVehicle';
import MotorcycleCategories from '../Utils/MotorcycleCategories';

export default interface IMotorcycle extends IVehicle {
  category: MotorcycleCategories;
  engineCapacity: number;
}