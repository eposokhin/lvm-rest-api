export class LogicalVolume {
    constructor(public hash: string, public lv: {name: string, vg_id: string} ) {}
    public static LogicalVolumeName = /^[a-zA-Z0-9_\u0400-\u04FF\s]+$/;
}   