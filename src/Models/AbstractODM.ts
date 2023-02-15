import { Model, model, models, Schema } from 'mongoose';

export default class AbstractODM<T> {
  protected schema: Schema;
  protected modelName: string;
  protected model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  public async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, vehicle: Partial<T>): Promise<T | null> {
    await this.model.updateOne(
      { id },
      { ...vehicle },
    );
    return this.model.findOne({ id });
  }
}