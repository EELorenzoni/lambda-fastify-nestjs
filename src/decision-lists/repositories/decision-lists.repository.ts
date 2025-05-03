// src/decisions/repositories/decisions.repository.ts
import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DecisionList } from '../entities/decision-list.entity';

interface DynamoDbItem {
    PK: string;
    workFlowName: string;
    elements: string[];
}

@Injectable()
export class DecisionListsRepository {
    private dynamoDb!: DynamoDB.DocumentClient;
    private readonly tableName = process.env['TABLE_NAME'] ?? '';

    constructor() {
        const url = process.env['DYNAMODB_URL'] || null;
        const config = url ? { endpoint: url } : {};
        try {
            this.dynamoDb = new DynamoDB.DocumentClient(config);
            console.log('DynamoDB Config:', config);
        } catch (error) {
            console.error('Error initializing DynamoDB client:', error);
        }
    }

    async findAll() {
        const params = {
            TableName: this.tableName,
        };
        return await this.dynamoDb.scan(params).promise()
            .then(data => data.Items)
            .catch(error => {
                console.error('Error fetching decision lists:', error);
                throw new Error('Could not fetch decision lists');
            });
    }

    async findAllByWorkFlowName(workFlowName: string) {

        const params = {
            TableName: this.tableName as string,
            IndexName: 'workFlowName-index',
            KeyConditionExpression: '#workFlowName = :workFlowName',
            ExpressionAttributeNames: {
                '#workFlowName': 'workFlowName',
            },
            ExpressionAttributeValues: {
                ':workFlowName': workFlowName,
            },
        };

        try {
            const result = await this.dynamoDb.query(params).promise();
            return this.mapDynamoDbItemsToDecisionList(result.Items as DynamoDbItem[]);
        } catch (error) {
            console.error('Error querying DynamoDB:', error); // <---- Loguea el error aquí
            throw new Error('Failed to retrieve decision lists.');
        }
    }

    mapDynamoDbItemsToDecisionList(items: DynamoDbItem[]): DecisionList[] {
        return items.map((item) => ({
            name: item.PK,
            values: item.elements,
        }));
    }
}