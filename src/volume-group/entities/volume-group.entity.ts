export class VolumeGroup {
    constructor(public hash: string, public name: string ) {}
    public static volumeGroupName = /^[a-zA-Z0-9_\u0400-\u04FF\s]+$/;
}   