export type Família = {
  família: string;
  Hábito: string;
  Folhas: string;
  // Inflorescência?: string;
  // Flores?: string;
  // Fruto?: string;
  Espécie: string;
  Localização: {
    label: string;
    link: string;
  };
  exemplares: Exemplar[];
  "Microstróbilos"?:string;
  "Megastróbilos"?:string;

  [k: string]:
    | string
    | {
        label: string;
        link: string;
      }
    | Exemplar[]|undefined;
};

export type Exemplar = {
  nome: string;
  tag?: string;
  arquivo?: string;
  info?: string;
  link?: string;
};

