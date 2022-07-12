import React, {ReactNode} from 'react';
import {TextStyle, ViewStyle} from 'react-native';

export type PrimitiveType =
  | string
  | number
  | boolean
  | (<T>(item: T) => React.ReactNode);

export type iTableProps = {
  headers?: string[];
  items: PrimitiveType[];
  headerStyles?: ViewStyle;
  headerContentStyles?: TextStyle;
  tableRowStyles?: ViewStyle;
  tableContentStyles?: TextStyle;
  itemsPerPage: number;
  actualPage: number;
  nextPage(): void;
  previousPage(): void;
  goToPage(page: number): void;
  customElements: CustomElement;
};

export type CustomElement = Record<string, (item: PrimitiveType) => ReactNode>;
//example:
// {
//   image: (image: iImage) => <Image />
// }
