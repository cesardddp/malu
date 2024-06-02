export interface Família {
	Família: string;
	Hábito: string;
	Folhas: string;
	Inflorescência?: string;
	Flores?: string;
	Fruto?: string;
	Espécie: string;
	link?: string;
	https?: string;
	Localização: Localizao;
	exemplares: Exemplares;
	Microstróbilos?: string;
	Megastróbilos?: string;
	Sementes?: string;
}

export interface Exemplares {
	arquivo: string;
	nome: string;
	tag: string;
	info: string;
	link: string;
}

export interface Localizao {
	label: string;
	link: string;
	coordenadas: Coordenadas;
}

export interface Coordenadas {
	lat: string;
	lng: string;
}

