import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const orders = [...Array(24)].map((_, index) => ({
    id: index + 1,
    avatar: `/assets/images/avatars/avatar_${index + 1}.jpg`,
    username: faker.name.fullName(),
    product: faker.commerce.productName(),
    amount: faker.datatype.number(),
    price: faker.commerce.price(),
    status: sample(['active', 'banned']),
    role: sample([
        'Leader',
        'Hr Manager',
        'UI Designer',
        'UX Designer',
        'UI/UX Designer',
        'Project Manager',
        'Backend Developer',
        'Full Stack Designer',
        'Front End Developer',
        'Full Stack Developer',
    ]),
}));

export default orders;
