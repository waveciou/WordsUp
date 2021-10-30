export interface ISheetDataItem {
  effectiveFormat: {};
  effectiveValue?: {};
  formattedValue?: string | undefined;
  userEnteredValue?: {};
}

export interface ISheetDataValue {
  values: ISheetDataItem[]
}
