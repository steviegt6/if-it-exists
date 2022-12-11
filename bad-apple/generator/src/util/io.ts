import { existsSync, mkdirSync, rmdirSync, rmSync } from "fs";
import { sep } from "path";

export function mkdirIfNotExists(path: string): void {
    if (!existsSync(path)) mkdirSync(path);
}

export function mkdirRecursive(path: string): void {
    const parts = path.split(sep);
    let currentPath = "";
    for (const part of parts) {
        currentPath += part + sep;
        mkdirIfNotExists(currentPath);
    }
}

export function rmdirIfExists(path: string): void {
    if (existsSync(path)) rmSync(path, { recursive: true });
}
