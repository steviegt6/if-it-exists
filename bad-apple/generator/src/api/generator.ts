import { AdventOfCodeGenerator } from "../impl/aoc-generator";

export const GENERATORS: IGenerator[] = [new AdventOfCodeGenerator()];

export interface IGenerator {
    name: string;

    run(): Promise<void>;
}
