import { Controller, Get, Post, Body, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { DecisionListsService } from '../services/decision-lists.service';
import { CreateDecisionListDto } from '../dto/create-decision-list.dto';
import { GetDecisionListsByWorkFlowNameDto } from '../dto/get-decision-lists-by-workflowname.dto';

@Controller('v1/api/decision-lists')
export class DecisionListsController {
  constructor(private readonly decisionListsService: DecisionListsService) { }

  @Post()
  create(@Body() createDecisionListDto: CreateDecisionListDto) {
    return this.decisionListsService.create(createDecisionListDto);
  }

  @Get()
  findAllByWorkflowName(@Query(new ValidationPipe()) query: GetDecisionListsByWorkFlowNameDto) {
    console.log({ query })
    return this.decisionListsService.findAllByWorkFlowName(query.workFlowName);
  }

  @Delete(':workFlowName')
  remove(@Param('workFlowName') workFlowName: string) {
    return this.decisionListsService.remove(workFlowName);
  }
}
