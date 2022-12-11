import { execSync } from "child_process";
import { existsSync } from "fs";
import prompts from "prompts";

export const DEFAULT_VIDEO_EXTENSION = "mkv";
export const DEFAULT_VIDEO_NAME = "bad-apple";
export const DEFAULT_VIDEO_PATH = DEFAULT_VIDEO_NAME + "." + DEFAULT_VIDEO_EXTENSION;

export interface Resolution {
    width: number;
    height: number;
}

export async function getResolution(defaultWidth: number = 50, defaultHeight: number = 50): Promise<Resolution> {
    const width = (
        await prompts({
            type: "number",
            name: "width",
            message: "Enter the width of the video",
            initial: defaultWidth,
            style: "default",
            min: 1
        })
    ).width;

    const height = (
        await prompts({
            type: "number",
            name: "height",
            message: "Enter the height of the video",
            initial: defaultHeight,
            style: "default",
            min: 1
        })
    ).height;

    return { width, height };
}

// TODO: prompt eventually
export function getVideoPath(): string {
    if (process.env.BAD_APPLE_PATH && existsSync(process.env.BAD_APPLE_PATH)) return process.env.BAD_APPLE_PATH;
    if (existsSync(DEFAULT_VIDEO_PATH)) return DEFAULT_VIDEO_PATH;

    console.log("Downloading video to path: " + DEFAULT_VIDEO_PATH);
    execSync(`youtube-dl https://www.youtube.com/watch?v=FtutLA63Cp8 -o ${DEFAULT_VIDEO_NAME}`);
    return DEFAULT_VIDEO_PATH;
}

export async function getFPS(defaultFps: number = 30): Promise<number> {
    const fps = (
        await prompts({
            type: "number",
            name: "fps",
            message: "Enter the FPS of the video",
            initial: defaultFps,
            style: "default",
            min: 1
        })
    ).fps;

    return fps;
}
