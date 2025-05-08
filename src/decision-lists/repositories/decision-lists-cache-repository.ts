// redis/redis.service.ts
import { Injectable } from '@nestjs/common';
import Redis, { Cluster } from 'ioredis';
import { DecisionList } from '../entities/decision-list.entity';

@Injectable()
export class DecisionListsCacheRespository {
    private redisClient: Redis | Cluster;
    private readonly REDIS_PORT = process.env['REDIS_PORT'];
    private readonly REDIS_HOST = process.env['REDIS_HOST'];
    private readonly REDIS_USE_CLUSTER = process.env['REDIS_USE_CLUSTER'];

    constructor() {
        const port = this.REDIS_PORT ? parseInt(this.REDIS_PORT) : 6379;
        const host = this.REDIS_HOST;
        const useCluster = this.REDIS_USE_CLUSTER?.toLowerCase() === 'true';

        if (!host || !port) {
            console.error('Redis host or port not defined. Cannot initialize Redis client.');
            throw new Error('Redis host or port not defined');
        }

        this.redisClient = useCluster
            ? this.createClusterClient(host, port)
            : this.createStandaloneClient(host, port);
    }

    private createClusterClient(host: string, port: number): Cluster {
        console.info(`Connecting to Redis Cluster using initial endpoint: ${host}:${port}`);
        const clusterClient = new Redis.Cluster([{ host, port }]);
        clusterClient.on('error', (err) => console.error('Redis Cluster Error', err));
        return clusterClient;
    }

    private createStandaloneClient(host: string, port: number): Redis {
        console.info(`Connecting to standalone Redis at ${host}:${port}`);
        const standaloneClient = new Redis({ host, port });
        standaloneClient.on('error', (err) => console.error('Standalone Redis Error', err));
        return standaloneClient;
    }

    private getClientType(): string {
        return this.redisClient instanceof Redis.Cluster ? 'Redis Cluster' : 'Standalone Redis';
    }

    async getDecisionListsByFlow(key: string): Promise<DecisionList[] | null> {
        try {
            const type = this.getClientType();
            const data = await this.redisClient.get(key);
            if (!data) {
                return null;
            }
            console.info(`${type}: Getting data for key ${key}`);
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error Getting data for key ${key}. Error: ${error}`);
        }
    }

    async setDecisionListsByFlow(key: string, data: DecisionList[]): Promise<void> {
        try {
            const type = this.getClientType();
            console.info(`${type}: Setting data for key ${key}`);
            await this.redisClient.set(key, JSON.stringify(data));
        } catch (error) {
            throw new Error(`Error Setting data for key ${key}. Error: ${error}`);
        }
    }

    async deleteDecisionListsByFlow(key: string): Promise<boolean | null> {
        try {
            const type = this.getClientType();
            console.info(`${type}: Deleting data for key ${key}`);
            const result = await this.redisClient.del(key);
            if (result === 0) {
                console.warn(`${type}: Key ${key} not found for deletion.`);
                return null;
            }
            return true;
        } catch (error) {
            throw new Error(`Error Deleting data for key ${key}. Error: ${error}`);
        }
    }


}