import { Injectable } from '@nestjs/common';
import { CreateDecisionListDto } from '../dto/create-decision-list.dto';
import { DecisionListsDatabaseRepository } from '../repositories/decision-lists-database.repository';
import { DecisionListsCacheRespository } from '../repositories/decision-lists-cache-repository';


@Injectable()
export class DecisionListsService {

  constructor(
    private readonly decisionDatabaseRepository: DecisionListsDatabaseRepository,
    private readonly decisionCacheRepository: DecisionListsCacheRespository
  ) { }


  create(createDecisionListDto: CreateDecisionListDto) {
    console.log({ createDecisionListDto });
    return 'This action adds a new decisionList';
  }

  async findAllByWorkFlowName(workFlowName: string) {

    const responseCache = await this.decisionCacheRepository.getDecisionListsByFlow(workFlowName);
    if (responseCache) {
      return responseCache;
    }
    const responseDatabase = await this.decisionDatabaseRepository.findAllByWorkFlowName(workFlowName);
    this.decisionCacheRepository.setDecisionListsByFlow(workFlowName, responseDatabase)
    return responseDatabase;
  }


  remove(workFlowName: string) {
    return this.decisionCacheRepository.deleteDecisionListsByFlow(workFlowName);
  }

}
