import run from "aocrunner";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return findSafeReports(input);

  function findSafeReports(reports) {
    return reports.reduce((safeReports, report) => {
      const isSafe = isReportSafe(report);

      return isSafe ? safeReports + 1 : safeReports;
    }, 0);
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return findSafeReports(input);

  function findSafeReports(reports) {
    return reports.reduce((safeReports, report) => {
      const reportVariants = report.map((_, index) => {
        const reportCopy = report.slice();
        reportCopy.splice(index, 1);

        return reportCopy;
      });
      const isSafe = reportVariants.some((reportVariant) =>
        isReportSafe(reportVariant),
      );

      return isSafe ? safeReports + 1 : safeReports;
    }, 0);
  }
};

function parseInput(rawInput) {
  return rawInput.split(/\n/).map((line) => {
    return line
      .trim()
      .split(/\s/)
      .map((x) => +x);
  });
}

function isReportSafe(report) {
  const isAllLevelsIncreasing = report.every((level, index) => {
    const nextLevel = report[index + 1];
    if (!nextLevel) {
      return true;
    }

    return nextLevel > level;
  });

  const isAllLevelsDecreasing = report.every((level, index) => {
    const nextLevel = report[index + 1];
    if (nextLevel === undefined) {
      return true;
    }

    return nextLevel < level;
  });

  const isLevelDifferenceInsideThreshold = report.every((level, index) => {
    const nextLevel = report[index + 1];
    if (!nextLevel) {
      return true;
    }

    const difference = Math.abs(nextLevel - level);

    return difference >= 1 && difference <= 3;
  });

  return (
    (isAllLevelsDecreasing || isAllLevelsIncreasing) &&
    isLevelDifferenceInsideThreshold
  );
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
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
