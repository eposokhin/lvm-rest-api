import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";

import * as storage from 'node-persist'
import { LogicalVolume } from "./entities/logical-volume.entity";
import { join } from "path";


@Injectable()
export class LogicalVolumeStorage implements OnModuleInit {
    async onModuleInit() {
        await storage.init({dir: join(__dirname, 'lvStorage') })
    }

    async save(hash: string, lv: {name: string, vg_id: string}): Promise<LogicalVolume> {
        const result = await storage.setItem(hash, lv)
        if(!result) throw new InternalServerErrorException()
        
        return new LogicalVolume(hash, lv)
    }

    async findByHash(hash: string): Promise<LogicalVolume | null> {
        const lv = await storage.getItem(hash)
        if (lv === undefined || lv === null) return null
        return new LogicalVolume(hash, lv)
    }
}