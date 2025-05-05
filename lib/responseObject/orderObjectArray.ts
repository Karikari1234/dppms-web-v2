export interface OrderObjectArray {
  _declaration: Declaration;
  result: Result;
}

export interface Declaration {
  _attributes: Attributes;
}

export interface Attributes {
  version: string;
  encoding: string;
}

export interface Result {
  _attributes: Attributes2;
  orders: Orders;
}

export interface Attributes2 {
  state: string;
  message: string;
  meterNo: string;
  customerNo: string;
}

export interface Orders {
  order: Order[];
}

export interface Order {
  date: Date;
  monthDifference: MonthDifference;
  orderNo: OrderNo;
  meterNo: MeterNo;
  customerNo: CustomerNo;
  operator: Operator;
  sequence: Sequence;
  energyCost: EnergyCost;
  arrearRecovery: ArrearRecovery;
  grossAmount: GrossAmount;
  tariffFees: TariffFees;
  tokens: Tokens;
}

export interface Date {
  _text: string;
}

export interface OrderNo {
  _text: string;
}

export interface MeterNo {
  _text: string;
}

export interface CustomerNo {
  _text: string;
}

export interface Operator {
  _text: string;
}

export interface Sequence {
  _text: string;
}

export interface EnergyCost {
  _text?: string;
}

export interface ArrearRecovery {
  _text?: string;
}

export interface GrossAmount {
  _text?: string;
}

export interface TariffFees {
  tariffFee?: TariffFee[];
}

export interface TariffFee {
  itemName: ItemName;
  chargeDes: ChargeDes;
  chargeAmount: ChargeAmount;
}

export interface ItemName {
  _text: string;
}

export interface ChargeDes {
  _text: string;
}

export interface ChargeAmount {
  _text: string;
}

export interface Tokens {
  _text: string;
}

export interface MonthDifference {
  _text: string;
}
