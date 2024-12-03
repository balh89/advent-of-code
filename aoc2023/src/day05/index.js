import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");
const _maps = {
  "seeds": "seeds",
  "seed-to-soil map:": "seedToSoilMap",
  "soil-to-fertilizer map:": "soilToFertilizerMap",
  "fertilizer-to-water map:": "fertilizerToWatermap",
  "water-to-light map:": "waterToLightMap",
  "light-to-temperature map:": "lightToTemperatureMap",
  "temperature-to-humidity map:": "temperatureToHumidityMap",
  "humidity-to-location map:": "humidityToLocationMap"
}
const part1 = (rawInput) => {
  const { maps } = parseInput(rawInput)
    .reduce((acc, line) => {
      if (!line) {
        return acc;
      }
      const map = (acc.currentMap === _maps.seeds && !_maps[line]) ? _maps.seeds : _maps[line]

      if (map) {
        if (map === _maps.seeds) {
          acc.maps[map] = line
            .split("seeds: ")[1]
            .split(" ")
            .map(Number);
        } else {
          acc.currentMap = _maps[line];
        }
      } else {
        const [destinationStart, sourceStart, rangeLength] = line.split(" ");
        if (!acc.maps[acc.currentMap]) {
          acc.maps[acc.currentMap] = [];
        }
        acc.maps[acc.currentMap].push({
          destinationStart,
          sourceStart,
          rangeLength
        })
      }
      return acc;
    }, { currentMap: "seeds", maps: {} });

  return Math.min(...maps.seeds.map(seed => {
    return Object.values(_maps)
      .slice(1)
      .reduce((acc, map) => {
        map = maps[map];
        const range = map.find(x => {
          return acc >= +x.sourceStart  && acc <= +(+x.sourceStart + +x.rangeLength)
        })
        if (range) {
          return acc + (+range.destinationStart - +range.sourceStart)
        } else {
          return acc;
        }
      }, seed)
  }));
};

const part2 = (rawInput) => {
  const { maps } = parseInput(rawInput)
    .reduce((acc, line) => {
      if (!line) {
        return acc;
      }
      const map = (acc.currentMap === _maps.seeds && !_maps[line]) ? _maps.seeds : _maps[line]

      if (map) {
        if (!acc.maps[acc.currentMap]) {
          acc.maps[acc.currentMap] = [];
        }
        if (map === _maps.seeds) {
          const seeds = line
            .split("seeds: ")[1]
            .split(" ")
            .map(Number);
            acc[map]
            for (let i = 0; i < seeds.length; i += 2) {

              acc.maps[map] = [...Array.from({length: firstLength}, (_, i) => i + firstStart), ...Array.from({length: secondLength}, (_, i) => i + secondStart)]
            }
        } else {
          acc.currentMap = _maps[line];z
        }
      } else {
        const [destinationStart, sourceStart, rangeLength] = line.split(" ");
        if (!acc.maps[acc.currentMap]) {
          acc.maps[acc.currentMap] = [];
        }
        acc.maps[acc.currentMap].push({
          destinationStart,
          sourceStart,
          rangeLength
        })
      }
      return acc;
    }, { currentMap: "seeds", maps: {} });

  return Math.min(...maps.seeds.map(seed => {
    return Object.values(_maps)
      .slice(1)
      .reduce((acc, map) => {
        map = maps[map];
        const range = map.find(x => {
          return acc >= +x.sourceStart  && acc <= +(+x.sourceStart + +x.rangeLength)
        })
        if (range) {
          return acc + (+range.destinationStart - +range.sourceStart)
        } else {
          return acc;
        }
      }, seed)
  }));
};

run({
  part1: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
        expected: 46,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
