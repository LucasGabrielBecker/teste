import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface iActionButtons {
  actualPage: number;
  previousPage(): void;
  nextPage(): void;
  lastPage: number;
  goToPage(page: number): void;
  buttonStyles?: ViewStyle;
  buttonTextStyles?: TextStyle;
}

export const Pagination = ({
  actualPage,
  lastPage,
  nextPage,
  goToPage,
  previousPage,
  buttonStyles = undefined,
  buttonTextStyles = undefined,
}: iActionButtons) => {
  const isFirstPage = actualPage === 1;
  const isLastPage = actualPage === lastPage;

  function ButtonPagination({
    label,
    active,
    ...props
  }: {
    label: string | number;
    active?: boolean;
    onPress(): void;
  }) {
    const btnTextStyles = StyleSheet.create({
      btnText: {
        fontWeight: active ? 'bold' : '400',
        color: active ? '#1363DF' : '#6E85B7',
        ...buttonTextStyles,
      },
    });
    return (
      <TouchableOpacity style={[styles.button, buttonStyles]} {...props}>
        <Text style={btnTextStyles.btnText}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <ButtonPagination
        label="<<"
        onPress={() => !isFirstPage && goToPage(1)}
      />
      <ButtonPagination
        label="<"
        onPress={() => !isFirstPage && previousPage()}
      />
      {Array.from({length: lastPage}, (_, v) => (
        <ButtonPagination
          key={v}
          active={actualPage === v + 1}
          label={v + 1}
          onPress={() => goToPage(v + 1)}
        />
      ))}
      <ButtonPagination label=">" onPress={() => !isLastPage && nextPage()} />
      <ButtonPagination
        label=">>"
        onPress={() => !isLastPage && goToPage(lastPage)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    border: '1px solid #dedede',
    backgroundColor: 'transparent',
    borderRadius: 8,
    color: '#6E85B7',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});
