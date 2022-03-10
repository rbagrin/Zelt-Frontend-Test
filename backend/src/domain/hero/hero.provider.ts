import { Hero } from './hero.entity';

export const heroProviders = [
  {
    provide: 'HERO_REPOSITORY',
    useValue: Hero,
  },
];
