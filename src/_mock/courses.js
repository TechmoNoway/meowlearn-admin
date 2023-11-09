import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const COURSE_NAME = [
  // 'Nike Air Force 1 NDESTRUKT',
  // 'Nike Space Hippie 04',
  // 'Nike Air Zoom Pegasus 37 A.I.R. Chaz Bear',
  // 'Nike Blazer Low 77 Vintage',
  // 'Nike ZoomX SuperRep Surge',
  // 'Zoom Freak 2',
  // 'Nike Air Max Zephyr',
  // 'Jordan Delta',
  // 'Air Jordan XXXV PF',
  // 'Nike Waffle Racer Crater',
  // 'Kyrie 7 EP Sisterhood',
  // 'Nike Air Zoom BB NXT',
  // 'Nike Air Force 1 07 LX',
  // 'Nike Air Force 1 Shadow SE',
  // 'Nike Air Zoom Tempo NEXT%',
  // 'Nike DBreak-Type',
  // 'Nike Air Max Up',
  // 'Nike Air Max 270 React ENG',
  // 'NikeCourt Royale',
  // 'Nike Air Zoom Pegasus 37 Premium',
  // 'Nike Air Zoom SuperRep',
  // 'NikeCourt Royale',
  // 'Nike React Art3mis',
  // 'Nike React Infinity Run Flyknit A.I.R. Chaz Bear',
  'Exploring Literary Genres: Argumentation in English',
  'Language and Culture: A Cross-Cultural Perspective',
  'Creative Writing Workshop: Crafting Your Voice',
  'Classics Reimagined: Adapting Literature for Modern Times',
  'Language and Identity: Analyzing Diverse Narratives',
  'The Power of Persuasion: Argumentation in English',
];

const COLORS = ['', '', '', '', '', ''];

const courses = [...Array(6)].map((_, index) => {
  const setIndex = index + 1;

  return {
    // id: faker.datatype.uuid(),
    id: index.toString(),
    cover: `/assets/images/courses/course_${setIndex}.jpg`,
    name: COURSE_NAME[index],
  };
});

export default courses;
