import { IsNotEmpty, IsString } from 'class-validator';

export class GetDecisionListsByWorkFlowNameDto {
    @IsNotEmpty()
    @IsString()
    workFlowName!: string;
}