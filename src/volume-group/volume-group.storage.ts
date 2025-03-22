import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";

import * as storage from 'node-persist'
import { VolumeGroup } from "./entities/volume-group.entity";
import { join } from "path";

@Injectable()
export class VolumeGroupStorage implements OnModuleInit {
    async onModuleInit() {
        await storage.init({dir: join(__dirname, 'vgStorage') })
    }

    async save(hash: string, name: string): Promise<VolumeGroup> {
        const result = await storage.setItem(hash, name)
        if(!result) throw new InternalServerErrorException()
        return new VolumeGroup(hash, name)
    }

    async findByHash(hash: string): Promise<VolumeGroup | null> {
        const name = await storage.getItem(hash)
        if (name === undefined || name === null) return null
        return new VolumeGroup(hash, name)
    }
}