import { execSync } from "child_process";
import { createReadStream, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import Jimp from "jimp";
import { join } from "path";
import { IGenerator } from "../api/generator";
import { getFPS, getResolution, getVideoPath } from "../util/genericPrompts";
import { mkdirRecursive, rmdirIfExists } from "../util/io";
import BadAppleData, { BadAppleFrame } from "./data";

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
        console.log("Compressing video to resolution: " + `${resolution.width}x${resolution.height}`);
        execSync(`ffmpeg -i ${path} -vf scale=${resolution.width}:${resolution.height} -c:a copy ${fileName}`);

        // write frames to folder
        const framesPath = join(PATH, "frames");
        console.log("Writing frames to folder: " + framesPath);
        mkdirRecursive(framesPath);
        execSync(`ffmpeg -i ${fileName} -vf fps=${fps} ${join(framesPath, "frame-%d.png")}`);

        // read frames from folder
        const framePaths = readdirSync(framesPath)
            .map((file) => join(framesPath, file))
            .map((file) => readFileSync(file));

        const baFrames: BadAppleFrame<string>[] = [];

        for (const path of framePaths) {
            const image = await Jimp.read(path);
            var frameData = "";

            for (var y = 0; y < image.bitmap.height; y++)
                for (var x = 0; x < image.bitmap.width; x++) {
                    // Simple threshold
                    if (image.bitmap.data[(image.bitmap.width * y + x) << 2] > 127) frameData += "#";
                    else frameData += "@";
                }

            baFrames.push({ width: image.bitmap.width, height: image.bitmap.height, data: frameData });
        }

        const baData: BadAppleData<BadAppleFrame<string>> = {
            frameCount: framePaths.length,
            fps: fps,
            frames: baFrames
        };

        // write data to file
        const dataPath = join(PATH, "data.json");
        console.log("Writing data to file: " + dataPath);
        writeFileSync(dataPath, JSON.stringify(baData));
    }
}
