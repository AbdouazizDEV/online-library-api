import { Test, TestingModule } from '@nestjs/testing';
import { TestService } from './test.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test as TestModel } from './test.schema'; // Assurez-vous que le modèle est correctement importé

describe('TestService', () => {
  let service: TestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TestService,
        {
          provide: getModelToken(TestModel.name),
          useValue: {
            // Mock des méthodes de TestModel
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<TestService>(TestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
