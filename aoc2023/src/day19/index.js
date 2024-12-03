import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  let [workFlows, partRatings] = parseInput(rawInput).split(/\n\n/);
  workFlows = workFlows.split("\n");
  partRatings = partRatings.split("\n")
  workFlows = formatWorkflows(workFlows);
  partRatings = partRatings.map(rating => {
    rating = rating.slice(1).slice(0, -1);
    rating = rating.split(",");
    return rating.reduce((acc, rating) => {
      const [char, value] = rating.split("=");
      acc.push({ char, value });
      return acc;
    }, [])
  })

  return partRatings.reduce((sumRatingNumbers, rating) => {
    const isAccepted = isRatingAccepted(rating, workFlows)
    if (isAccepted) {
      sumRatingNumbers += rating.reduce((sum, x) => sum += +x.value, 0);
    }
    return sumRatingNumbers
  }, 0);

  function isRatingAccepted(rating, workFlows, activeWorkFlow = "in") {
    const workFlow = workFlows[activeWorkFlow]
    return workFlow.reduce((acc, rule) => {
      if (acc !== null) {
        return acc;
      }
  
      if (rule.action) {
        const action = rule.action;
        if (action === "accept") {
          acc = true;
        } else if (action === "reject") {
          acc = false;
        } else if (rule.a && rule.b) {
          const rat = rating.find(x => x.char == rule.a);
  
          const result = eval(`${+rat.value}${rule.action}${+rule.b}`);
          if (result) {
            if (rule.result === "A") {
              acc = true;
            } else if (rule.result === "R") {
              acc= false;
            } else {
              acc = isRatingAccepted(rating, workFlows, rule.result);
            }
          }
        }
      } else {
        acc = isRatingAccepted(rating, workFlows, rule.result);
      }
      return acc;
    }, null)
  }
};

function formatWorkflows(workFlows) {
  return workFlows.reduce((acc, workFlow) => {
    const foo = formatWorkflow(workFlow);
    acc[foo[0].name] = foo;
    return acc;
  }, {})
}

function formatWorkflow(workflow) {
  let [name, rules] = workflow.replaceAll(/[{}]/g, " ").trim().split(/\s/);
  let value;
  rules = rules.split(",")
  return  rules.map(rule => {
    if (rule === "A") {
      value =  { name, action: "accept" }
    } else if (rule === "R") {
      value =  { name, action: "reject" }
    } else if (rule.includes(":")) {
      const [logic, result] = rule.split(":");
      let [a, action, ...b] = logic.split("");
      b = b.join("");
      value = {name, a, action, b, result };
    } else {
      value =  { name,  result: rule }
    }
    return value;
  })
}


const part2 = (rawInput) => {
  let [workFlows] = parseInput(rawInput).split(/\n\n/);
  workFlows = workFlows.split("\n");
  workFlows = formatWorkflows(workFlows);
  return sumCombinations(workFlows)

  function sumCombinations(workFlows, activeWorkFlow = "in") {
    const workFlow = workFlows[activeWorkFlow]
    return workFlow.reduce((acc, rule) => {
      if (rule.action) {
        const action = rule.action;
        if (action === "accept") {
        } else if (action === "reject") {
        } else if (rule.a && rule.b) {
          if (rule.action === "<" ) {
            acc *= (rule.b - 1)
          } else if (rule.action === ">") {
            acc *= (4000 - rule.b - 1)
          }
          if (rule.result === "A") {
          } else if (rule.result === "R") {
          } else {
            acc *= sumCombinations(workFlows, rule.result);
          }
        }
      } else {
        acc += sumCombinations(workFlows, rule.result);
      }
      return acc;
    }, 1)
  }
};

run({
  part1: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}
        `,
        expected: 19114,
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        px{a<2006:qkq,m>2090:A,rfg}
        pv{a>1716:R,A}
        lnx{m>1548:A,A}
        rfg{s<537:gd,x>2440:R,A}
        qs{s>3448:A,lnx}
        qkq{x<1416:A,crn}
        crn{x>2662:A,R}
        in{s<1351:px,qqz}
        qqz{s>2770:qs,m<1801:hdj,R}
        gd{a>3333:R,R}
        hdj{m>838:A,pv}
        
        {x=787,m=2655,a=1222,s=2876}
        {x=1679,m=44,a=2067,s=496}
        {x=2036,m=264,a=79,s=2244}
        {x=2461,m=1339,a=466,s=291}
        {x=2127,m=1623,a=2188,s=1013}
        `,
        expected: 167409079868000,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
