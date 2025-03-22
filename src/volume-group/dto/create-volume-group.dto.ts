import { ArrayMinSize, IsArray, IsNotEmpty, IsString, Matches } from "class-validator";
import { VolumeGroup } from "../entities/volume-group.entity";
export class CreateVolumeGroupDto {
    @IsString()
    @IsNotEmpty()
    @Matches(VolumeGroup.volumeGroupName)
    name: string;
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    drives: string[];
}
