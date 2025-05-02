import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DecisionListsService } from './decision-lists.service';
import { CreateDecisionListDto } from './dto/create-decision-list.dto';
import { UpdateDecisionListDto } from './dto/update-decision-list.dto';

@Controller('v1/api/decision-lists')
export class DecisionListsController {
  constructor(private readonly decisionListsService: DecisionListsService) {}

  @Post()
  create(@Body() createDecisionListDto: CreateDecisionListDto) {
    return this.decisionListsService.create(createDecisionListDto);
  }

  @Get()
  findAll() {
    return this.decisionListsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decisionListsService.findOne(+id);
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
