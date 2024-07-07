export interface ISolarTotal {
  name: string;
  generation: number;
  smp: number;
  calcul: number;
  supplyPrice: number;
  vat: number;
  total: number;
}

export interface IIRecData {
  issuance: number;
  fee: number;
  remain: number;
  createdAt: string;
}

export interface IIRecTotal extends Omit<IIRecData, "createdAt"> {
  name: string;
}
