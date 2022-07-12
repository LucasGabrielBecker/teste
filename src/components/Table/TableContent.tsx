import React, {ReactElement} from 'react';
import {Text, TextStyle, View} from 'react-native';
import {CustomElement, PrimitiveType} from './types';

interface TableContentProps {
  itemToRender: PrimitiveType;
  customElements?: CustomElement;
  style?: TextStyle;
}
export const TableContent = ({
  itemToRender,
  customElements,
  ...props
}: TableContentProps): ReactElement | ReactElement[] => {
  return objectKeys(itemToRender).map(content => {
    const customElement = customElements?.[content];

    if (customElement) {
      // styles will be passed by props only for default items
      // if a custom item exists it must specify it's own styles
      return <View>{customElement(content)}</View>;
    }
    return (
      <View {...props}>
        <Text>{itemToRender[content]}</Text>
      </View>
    );
  });
};

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map(objectKey => objectKey as keyof T);
}
