import { Injectable } from '@nestjs/common';
import { CreateDecisionListDto } from '../dto/create-decision-list.dto';
import { UpdateDecisionListDto } from '../dto/update-decision-list.dto';
import { DecisionListsRepository } from '../repositories/decision-lists.repository';


@Injectable()
export class DecisionListsService {

  constructor(private readonly decisionsRepository: DecisionListsRepository) { }


  create(createDecisionListDto: CreateDecisionListDto) {
    console.log({ createDecisionListDto });
    return 'This action adds a new decisionList';
  }

  async findAll() {
    return await this.decisionsRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} decisionList`;
  }

  async findAllByWorkFlowName(workFlowName: string) {

    return await this.decisionsRepository.findAllByWorkFlowName(workFlowName);
  }


  update(id: number, updateDecisionListDto: UpdateDecisionListDto) {
    console.log({ updateDecisionListDto });
    return `This action updates a #${id} decisionList`;
  }

  remove(id: number) {
    return `This action removes a #${id} decisionList`;
  }

}
