import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split(/\n/);

function createModules(input) {
  const modules = input.reduce((modules, line) => {
    if (line.startsWith("broadcaster")) {
      const type = "broadcaster";
      const outputs = line.split("broadcaster -> ")[1].split(", ")
      modules[type] = { type, name: type, outputs };
    } else {
      const type = formatType(line[0]);
      const state = type === "flipFlop" ? "off" : null;
      line = line.slice(1);
      let [name, outputs] = line.split(" -> ");
      outputs = outputs.split(", ")
      modules[name] = { type, name, outputs, state };
    }
    return modules;
  }, {})

  const conjunctionModules = Object.values(modules).filter(module => module.type === "conjunction")
  conjunctionModules.forEach(conjunctionModule => {
    const inputs = Object.values(modules).filter(module => module.outputs.includes(conjunctionModule.name)).map(module => ({ name: module.name, pulse: "low" }));
    conjunctionModule.inputs = inputs;
  })
  
  return modules;
}

function formatType(type) {
  switch(type) {
    case "%": {
      return "flipFlop";
    }
    case "&": {
      return "conjunction";
    }
    default: {
      throw new Error("WRONG TYPE!")
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const modules = createModules(input);
  const { highPulse, lowPulse } =  runModules(modules);
  return lowPulse * highPulse;

  function runModules(modules) {
    let lowPulse = 0;
    let highPulse = 0;
    const queue = [];
    for (let i = 0; i < 1000; i++) {
      queue.push({ module: { type: "button", name: "button" } })
      while(queue.length) {
        const { module, input, pulse } = queue.shift();
        let newPulse;
        switch(module.type) {
          case "button": {
            lowPulse++;
            const broadcaster = modules.broadcaster;
            queue.push({ module: broadcaster, input: "button", pulse: "low" });
            break;
          }
          case "broadcaster": {
            queue.push(...module.outputs.map(moduleName => {
              lowPulse++;
              const module = modules[moduleName];
              return { module, input: "broadcaster", pulse }
            }));
            break;
          }
          case "flipFlop": {
            if (pulse === "low") {
              if (module.state === "off") {
                module.state = "on";
                newPulse = "high";
              } else {
                module.state = "off";
                newPulse = "low";
              }
            } else {
              continue;
            }
            module.outputs.forEach(moduleName => {
              if (newPulse === "low") {
                lowPulse++;
              } else {
                highPulse++;
              }
              if (modules[moduleName]) {
                queue.push({ module: modules[moduleName], input: module.name, pulse: newPulse  });
              }
            });
          }
          break;
          case "conjunction": {
            const lastInput = module.inputs.find(inputModule => inputModule.name === input);
            lastInput.pulse = pulse;
            const allHigh = module.inputs.every(input => input.pulse === "high");
            if (allHigh) {
              newPulse = "low";
            } else {
              newPulse = "high";
            }
            module.outputs.forEach(moduleName => {
              if (newPulse === "low") {
                lowPulse++;
              } else {
                highPulse++;
              }
              if (modules[moduleName]) {
                queue.push({ module: modules[moduleName], input: module.name, pulse: newPulse  });
              }
            });
            break;
          }
          default: {
            throw new Error("wrong module!")
          }
        }
      }
    }
    return { lowPulse, highPulse }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const modules = createModules(input);
  return runModules(modules);

  function runModules(modules) {
    let lowPulse = 0;
    let highPulse = 0;
    const queue = [];
    let rxPulse = "high";
    let counter = 0;
    
    while(rxPulse !== "low") {
      queue.push({ module: { type: "button", name: "button" } })
      counter++;
      while(queue.length) {
        const { module, input, pulse } = queue.shift();
        let newPulse;
        switch(module.type) {
          case "button": {
            lowPulse++;
            const broadcaster = modules.broadcaster;
            queue.push({ module: broadcaster, input: "button", pulse: "low" });
            break;
          }
          case "broadcaster": {
            queue.push(...module.outputs.map(moduleName => {
              lowPulse++;
              const module = modules[moduleName];
              return { module, input: "broadcaster", pulse }
            }));
            break;
          }
          case "flipFlop": {
            if (pulse === "low") {
              if (module.state === "off") {
                module.state = "on";
                newPulse = "high";
              } else {
                module.state = "off";
                newPulse = "low";
              }
            } else {
              continue;
            }
            module.outputs.forEach(moduleName => {
              if (newPulse === "low") {
                lowPulse++;
              } else {
                highPulse++;
              }
              if (modules[moduleName]) {
                queue.push({ module: modules[moduleName], input: module.name, pulse: newPulse  });
              } else {
                if (newPulse === "low") {
                  rxPulse = "low";
                }
              }
            });
          }
          break;
          case "conjunction": {
            const lastInput = module.inputs.find(inputModule => inputModule.name === input);
            lastInput.pulse = pulse;
            const allHigh = module.inputs.every(input => input.pulse === "high");
            if (allHigh) {
              newPulse = "low";
            } else {
              newPulse = "high";
            }
            module.outputs.forEach(moduleName => {
              if (newPulse === "low") {
                lowPulse++;
              } else {
                highPulse++;
              }
              if (modules[moduleName]) {
                queue.push({ module: modules[moduleName], input: module.name, pulse: newPulse  });
              } else {
                if (newPulse === "low") {
                  rxPulse = "low";
                }
              }
            });
            break;
          }
          default: {
            throw new Error("wrong module!")
          }
        }
      }
    }
    return counter;
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        broadcaster -> a, b, c
        %a -> b
        %b -> c
        %c -> inv
        &inv -> a
        `,
        expected: 32000000,
      },
      {
        input: `
        broadcaster -> a
        %a -> inv, con
        &inv -> b
        %b -> con
        &con -> output
        `,
        expected: 11687500,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
