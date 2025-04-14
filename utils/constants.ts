import {isDev} from './helper'; 


 export const pricingPlans = [
  {
    name: 'Basic',
    price: 9,
    description: 'Perfect for occasional use',
    items: [
      '5 PDF summaries per month',
      'Standard processing speed',
      'Email support',
    ],
    id: 'basic',
    paymentLink:isDev  ? 'https://buy.stripe.com/test_aEU3g009VaQJ0KI9AA': '',
    priceId: isDev? 'price_1RDOucFjXNdksKgpw84HWTWO':'',
  },
  {
    name: 'Pro',
    price: 19,
    description: 'For professionals and teams',
    items: [
      'Unlimited PDF summaries',
      'Priority processing',
      'Dedicated support',
    ],
    id: 'pro',
    paymentLink:isDev ? 'https://buy.stripe.com/test_fZe03ObSDbUNctq3cd': '',
    priceId:isDev ? 'price_1RDOvSFjXNdksKgpsDdfp4L6':'',
  },

  // {
  //   name: 'Enterprise',
  //   price: 49,
  //   description: 'For large organizations',
  //   items: [
  //     'Unlimited PDF summaries',
  //     'Ultra-fast processing',
  //     '24/7 priority support',
  //     'API access',
  //   ],
  //   id: 'enterprise',
  //   paymentLink: '',
  //   priceId: '',
  // },
];



export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren:0.1,
    },
  },
};


export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};