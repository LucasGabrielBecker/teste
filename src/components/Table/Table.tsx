import React from 'react';
import {View, Text, ViewStyle, StyleSheet} from 'react-native';
import {iTableProps, PrimitiveType} from './types';

function capitalize(value: string): string {
  const [firstLetter, ...rest] = value;
  return firstLetter.toUpperCase() + rest.join('');
}

export default function Table(props: iTableProps) {
  const {
    headers = null,
    items,
    headerStyles = null,
    headerContentStyles = null,
    tableContentStyles = null,
    tableRowStyles = null,
    itemsPerPage = 10,
    actualPage = 1,
    nextPage,
    previousPage,
    goToPage,
    customElements = null,
  } = props;

  const definedOrInferredHeaders: string[] = headers
    ? headers
    : Object.keys(props.items[0]).map(capitalize);

  const start = (actualPage - 1) * itemsPerPage;
  const end = actualPage * itemsPerPage;
  const itemsPaginated = items.slice(start, end);
  const lastPage = Math.round(items.length / itemsPerPage);
  return (
    <View>
      <View style={{...styles.header, ...headerStyles} as ViewStyle}>
        {definedOrInferredHeaders.map((header: string) => (
          <Text
            style={[styles.headerContent, headerContentStyles]}
            key={header}>
            {header}
          </Text>
        ))}
      </View>

      <View style={{minHeight: itemsPerPage * 30}}>
        {itemsPaginated.map((item: PrimitiveType) => (
          <View
            key={JSON.stringify(item)}
            style={[styles.tableRow, tableRowStyles] as ViewStyle}>
            <TableContent
              itemToRender={item}
              customElements={customElements}
              style={[styles.tableContent, tableContentStyles]}
            />
          </View>
        ))}
      </View>
      <View>
        <Pagination
          actualPage={actualPage}
          lastPage={lastPage}
          nextPage={nextPage}
          previousPage={previousPage}
          goToPage={goToPage}
          paginationButtonsStyle={{color: 'red'}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderWidth: 1,
    height: 63,
    borderColor: '#dedede',
  },
  headerContent: {
    color: '#000',
    fontWeight: 'bold',
    width: 100,
  },
  tableContent: {
    color: '#151515',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: 2,
    paddingLeft: 10,
    width: 100,
  },
  tableRow: {
    flexDirection: 'row',
    height: 63,
    alignItems: 'center',
    borderRightWidth: 1,
    border: '1px solid white',
    borderRightColor: '#000',
  },
  pagination: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
});
