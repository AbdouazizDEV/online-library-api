// src/test/test.controller.ts
import { Controller, Post, Get } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async testConnection() {
    try {
      const result = await this.testService.createTest();
      return {
        message: 'Connection to MongoDB successful!',
        data: result,
      };
    } catch (error) {
      return {
        message: 'Connection failed',
        error: error.message
      };
    }
  }
}
