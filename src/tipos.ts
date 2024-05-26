export type Famílias =  {
  família: string;
  'Hábito': string;
  Folhas: string;
  'Inflorescência': string;
  Flores: string;
  Fruto: string;
  'Espécie': string;
  'Localização': string;
  exemplares:Exemplar[]
}

export type Exemplar = {
  nome:string
  arquivo:string
  info:string
}