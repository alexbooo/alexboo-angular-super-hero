import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SUPERHEROES } from './mock-superheroes';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		let superHeroes = SUPERHEROES;
		return { superHeroes };
	}
}
