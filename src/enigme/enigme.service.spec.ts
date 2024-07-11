import { Test, TestingModule } from '@nestjs/testing';
import { EnigmeService } from './enigme.service';

describe('EnigmeService', () => {
  let service: EnigmeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnigmeService],
    }).compile();

    service = module.get<EnigmeService>(EnigmeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
