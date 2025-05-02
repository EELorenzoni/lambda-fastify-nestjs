import { Injectable } from '@nestjs/common';
import { CreateDecisionListDto } from './dto/create-decision-list.dto';
import { UpdateDecisionListDto } from './dto/update-decision-list.dto';

@Injectable()
export class DecisionListsService {
  create(createDecisionListDto: CreateDecisionListDto) {
    console.log({ createDecisionListDto });
    return 'This action adds a new decisionList';
  }

  findAll() {
    return `This action returns all decisionLists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} decisionList`;
  }

  update(id: number, updateDecisionListDto: UpdateDecisionListDto) {
    console.log({ updateDecisionListDto });
    return `This action updates a #${id} decisionList`;
  }

  remove(id: number) {
    return `This action removes a #${id} decisionList`;
  }
}
