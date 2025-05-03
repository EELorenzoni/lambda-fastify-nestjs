import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { DecisionListsService } from '../services/decision-lists.service';
import { CreateDecisionListDto } from '../dto/create-decision-list.dto';
import { UpdateDecisionListDto } from '../dto/update-decision-list.dto';
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDecisionListDto: UpdateDecisionListDto) {
    return this.decisionListsService.update(+id, updateDecisionListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decisionListsService.remove(+id);
  }
}
