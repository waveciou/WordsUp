export interface ISheetDataItem {
  effectiveFormat: {};
  effectiveValue?: {};
  formattedValue?: string | undefined;
  userEnteredValue?: {};
}

export interface ISheetDataValue {
  values: ISheetDataItem[]
}

export interface IGapisConfig {
  API_KEY: string,
  CLIENT_ID: string,
  SCOPE: string,
  SHEET_ID: string,
  DISCOVERY_DOCS: string
}
