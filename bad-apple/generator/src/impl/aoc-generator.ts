import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { join } from "path";
import { IGenerator } from "../api/generator";
import { getFPS, getResolution, getVideoPath } from "../util/genericPrompts";
import { mkdirRecursive, rmdirIfExists } from "../util/io";

const PATH = join("generated", "advent-of-code");

export class AdventOfCodeGenerator implements IGenerator {
    name: string = "advent-of-code";

    async run(): Promise<void> {
        rmdirIfExists(PATH);
        mkdirRecursive(PATH);

        console.log("Using generator: " + this.name);
        const resolution = await getResolution(50, 24); // 24 instead of 25 because first line is used for fun.
        const path = getVideoPath();
        const fps = await getFPS(10);

        console.log(`Path: ${path}, Resolution: ${resolution.width}x${resolution.height}, FPS: ${fps}`);

        // compress video to resolution with ffmpeg
        const fileName = join(PATH, `bad-apple-${resolution.width}x${resolution.height}.mkv`);
        execSync(`ffmpeg -i ${path} -vf scale=${resolution.width}:${resolution.height} -c:a copy ${fileName}`);

        // write frames to folder
        mkdirRecursive(join(PATH, "frames"));
        execSync(`ffmpeg -i ${fileName} -vf fps=${fps} ${join(PATH, "frames", "frame-%d.png")}`);
    }
}
