export type Família =  {
  família: string;
  'Hábito': string;
  Folhas: string;
  'Inflorescência': string;
  Flores: string;
  Fruto: string;
  'Espécie': string;
  'Localização': {
    label:string
    link:string
  };
  exemplares:Exemplar[]
}

export type Exemplar = {
  nome:string
  arquivo:string
  info:string
}