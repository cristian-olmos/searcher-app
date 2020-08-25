import {Hateoas} from './hateoas';

export interface Hotel {
  name: string;
  id: string;
  category: string;
  address: string;
  links: Hateoas[];
}
