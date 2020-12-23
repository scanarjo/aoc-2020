import tap from 'tap'

const sampleData = `
light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.
`;

interface BagRule {
  colour: string,
  canContain: string[]
}

const parseBagRule = (rule: string): BagRule => {
  const matches = [ ...rule.matchAll(/(\w+ \w+) bags?/g) ];

  const [ colour, ...canContain ] = matches.map(([ wholeMatch, colour ]) => colour);

  return {
    canContain,
    colour,
  };
}

tap.test('parseBagRule()', async t => {
  t.test('should correctly parse the bag colour', async t => {
    const { colour } = parseBagRule('light red bags contain 1 bright white bag, 2 muted yellow bags.');

    t.equals(colour, 'light red');
  })

  t.test('should correctly parse the permitted contents', async t => {
    const { canContain } = parseBagRule('light red bags contain 1 bright white bag, 2 muted yellow bags.');

    t.deepEquals(canContain, ['bright white', 'muted yellow']);
  })
})

const findAllowedBags = (rules: BagRule[], colour: string): string[] => {
  const allowedBags = [];
  rules.forEach(rule => {
    if(rule.canContain.includes(colour)) {
      allowedBags.push(rule.colour);
    } else {
      const newRules = rule.canContain
        .map(colour => rules.find(rule => rule.colour === colour))
        .filter(maybeRule => maybeRule !== undefined) as BagRule[];

      findAllowedBags(newRules, rule.colour)
    }
  })
  return rules
    .filter(({ canContain }) => canContain.includes(colour))
    .map(({ colour }) => colour);
}

tap.test('findAllowedBags()', async t => {
  t.test('should return the correct list of bags for simple relationships', async t => {
    const testRules = [
      { colour: 'light red', canContain: ['shiny gold', 'light blue'] },
      { colour: 'dark green', canContain: ['light blue'] }
    ]

    const allowedBags = findAllowedBags(testRules, 'shiny gold');

    t.deepEquals(allowedBags, ['light red']);
  })

  t.test('should return the correct list of bags for nested relationships', async t => {
    const testRules = [
      { colour: 'light red', canContain: ['shiny gold', 'light blue'] },
      { colour: 'dark green', canContain: ['light blue'] },
      { colour: 'dark blue', canContain: ['light red', 'muted yellow'] },
    ]

    const allowedBags = findAllowedBags(testRules, 'shiny gold');

    t.deepEquals(allowedBags, ['light red', 'dark blue']);
  })
})
