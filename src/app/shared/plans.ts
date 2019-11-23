import { Plan } from './plan';

export const PLANS: Plan[] = [
    {
        id: 0,
        name: 'plan1',
        image: '/assets/images/stock.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        featured: true,
        description: 'این توضیحات بورس اوراق است',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in demo!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
            }
        ]
    },
    {
        id: 1,
        name: 'plan2',
        image: '/assets/images/commodity.png',
        category: 'appetizer',
        label: '',
        price: '1.99',
        featured: false,
        description: 'این توضیحات بورس کالا است',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in demo!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
            }
        ]
    },
    {
        id: 2,
        name: 'plan3',
        image: '/assets/images/crypto.png',
        category: 'appetizer',
        label: 'New',
        price: '1.99',
        featured: false,
        description: 'این توضیحات بورس رمز ارزها است',
        comments: [
            {
                rating: 5,
                comment: "Imagine all the eatables, living in demo!",
                author: "John Lemon",
                date: "2012-10-16T17:57:28.556094Z"
            }
        ]
    }
];
