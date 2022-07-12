/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Table} from './src/components/Table';
import Items from './src/components/Table/itens.json';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [actualPage, updatePage] = React.useState(2);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Table
        items={Items}
        actualPage={actualPage}
        goToPage={(page: number) => updatePage(page)}
        previousPage={() => updatePage(p => p - 1)}
        nextPage={() => {
          updatePage(p => p + 1);
        }}
      />
    </SafeAreaView>
  );
};

export default App;
