// src/test/test.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './test.schema';

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private testModel: Model<Test>) {}

  async createTest(): Promise<Test> {
    const createdTest = new this.testModel({
      name: 'Test Connection',
      createdAt: new Date(),
    });
    return createdTest.save();
  }
}
