import { Activity } from './entites';

const activities: Activity[] = [
  {
    id: 1,
    title: `./app/components/card-list.tsx
            (9,3): error TS2377: Constructors for derived classes must contain a 'super' call.`,
    timesOccurred: 5,
    timeOfOccurence: '2015-11-10 09:39:42',
  },
  {
    id: 2,
    title: `./app/components/card-list.tsx(54,43): error TS1005: ':' expected.`,
    timesOccurred: 1,
    timeOfOccurence: '2015-11-10 10:59:22',
  },
];

export default activities;
