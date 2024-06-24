export interface CustomerInformation {
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
  customerAccountNo: CustomerAccountNo;
  customerName: CustomerName;
  customerAddress: CustomerAddress;
  customerPhone: CustomerPhone;
  sndDivision: SndDivision;
  division: Division;
  tariffCategory: TariffCategory;
  connectionCategory: ConnectionCategory;
  accountType: AccountType;
  meterType: MeterType;
  sanctionLoad: SanctionLoad;
  meterNumber: MeterNumber;
  lastRechargeAmount: LastRechargeAmount;
  lastRechargeTime: LastRechargeTime;
  remainingBalance: RemainingBalance;
  readingTime: ReadingTime;
  maxLoadLastMonth: MaxLoadLastMonth;
  maxLoadLastYear: MaxLoadLastYear;
  usedThisMonthKWH: UsedThisMonthKwh;
  usedThisMonthBDT: UsedThisMonthBdt;
  totalRechargeThisMonth: TotalRechargeThisMonth;
  installationDate: InstallationDate;
  lockStatus: LockStatus;
  disconnectStatus: DisconnectStatus;
}

export interface Attributes2 {
  state: string;
  message: string;
  meterNo: string;
}

export interface CustomerAccountNo {
  _text: string;
}

export interface CustomerName {
  _text: string;
}

export interface CustomerAddress {
  _text: string;
}

export interface CustomerPhone {
  _text: string;
}

export interface SndDivision {
  _text: string;
}

export interface Division {
  _text: string;
}

export interface TariffCategory {
  _text: string;
}

export interface ConnectionCategory {
  _text: string;
}

export interface AccountType {
  _text: string;
}

export interface MeterType {
  _text: string;
}

export interface SanctionLoad {
  _text: string;
}

export interface MeterNumber {
  _text: string;
}

export interface LastRechargeAmount {
  _text: string;
}

export interface LastRechargeTime {
  _text: string;
}

export interface RemainingBalance {}

export interface ReadingTime {}

export interface MaxLoadLastMonth {}

export interface MaxLoadLastYear {}

export interface UsedThisMonthKwh {}

export interface UsedThisMonthBdt {}

export interface TotalRechargeThisMonth {
  _text: string;
}

export interface InstallationDate {
  _text: string;
}

export interface LockStatus {}

export interface DisconnectStatus {}
