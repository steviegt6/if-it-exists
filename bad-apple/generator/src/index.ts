import prompts from "prompts";
import { GENERATORS, IGenerator } from "./api/generator";

console.log(`
bad-apple > genrator - Tool for generating frames for Bad Apple.
Copyright (C) 2022  Tomat

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.
`);

(async () => {
    const generatorMap: { [key: string]: IGenerator } = {};
    GENERATORS.forEach((generator: IGenerator) => {
        generatorMap[generator.name] = generator;
    });

    const generator = await prompts({
        type: "select",
        name: "value",
        message: "Choose a generator",
        choices: GENERATORS.map((generator: IGenerator) => {
            return {
                title: generator.name,
                value: generator.name
            };
        })
    });

    await generatorMap[generator.value].run();
})();
