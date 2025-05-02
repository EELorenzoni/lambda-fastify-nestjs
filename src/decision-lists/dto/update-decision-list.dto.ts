import { PartialType } from '@nestjs/mapped-types';
import { CreateDecisionListDto } from './create-decision-list.dto';

export class UpdateDecisionListDto extends PartialType(CreateDecisionListDto) {}
