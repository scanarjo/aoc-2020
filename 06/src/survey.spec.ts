import tap from 'tap';

import { countMutualAnswers, countUniqueAnswers, splitAnswerGroups } from './survey';

tap.test('countUniqueAnswers()', async t => {
  t.test('should give the correct answer when all answers are unique', async t => {
    t.equals(countUniqueAnswers('abc'), 3);
  });

  t.test('should give the correct answer when duplicates are present', async t => {
    t.equals(countUniqueAnswers('aabbbcde'), 5);
  });

  t.test('should give the correct answer when the answer is split over multiple lines', async t => {
    const answer = `
a
b
c
d
`;

    t.equals(countUniqueAnswers(answer), 4);
  });
});

const multipleAnswerGroups = `
abc

a
b
c

ab
ac

a
a
a
a

b
`;

tap.test('splitAnswerGroups()', async t => {
  t.test('should give the correct groups', async t => {
    const groups = splitAnswerGroups(multipleAnswerGroups);

    t.equals(groups.length, 5);
    t.equals(groups[0], 'abc');
    t.equals(groups[4], 'b');
  });
});

tap.test('countMutualAnswers()', async t => {
  t.test('should give the correct answer for a single submission', async t => {
    t.equals(countMutualAnswers('abc'), 3);
  });

  t.test('should give the correct answer for 2 submissions where everyone has the same answers', async t => {
    const answers = `
abc
abc
`;

    t.equals(countMutualAnswers(answers), 3);
  });

  t.test('should give the correct answer for 2 submissions where people have the differing answers', async t => {
    const answers = `
ab
abc
`;

    t.equals(countMutualAnswers(answers), 2);
  });
});
