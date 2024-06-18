import { Test, TestingModule } from '@nestjs/testing';
import { EnigmeController } from './enigme.controller';

describe('QuestionController', () => {
  let controller: EnigmeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnigmeController],
    }).compile();

    controller = module.get<EnigmeController>(EnigmeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
