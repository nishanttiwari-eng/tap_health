import React from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from './src/utils/constants';
import { QuickAddMeal } from './src/ components/QuickAddMeal/QuickAddMeal';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.background}
        />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Quick Add Meal</Text>
        </View>
        <QuickAddMeal />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;

// import React from 'react';
// import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
// import { COLORS } from './src/utils/constants';
// import { QuickAddMeal } from './src/ components/QuickAddMeal/QuickAddMeal';

// const App: React.FC = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar
//         barStyle="dark-content"
//         backgroundColor={COLORS.background}
//       />
//       <QuickAddMeal />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.background,
//   },
// });

// export default App;

// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  */

// // import { NewAppScreen } from '@react-native/new-app-screen';
// // import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
// // import {
// //   SafeAreaProvider,
// //   useSafeAreaInsets,
// // } from 'react-native-safe-area-context';

// // function App() {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   return (
// //     <SafeAreaProvider>
// //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
// //       <AppContent />
// //     </SafeAreaProvider>
// //   );
// // }

// // function AppContent() {
// //   const safeAreaInsets = useSafeAreaInsets();

// //   return (
// //     <View style={styles.container}>
// //       <NewAppScreen
// //         templateFileName="App.tsx"
// //         safeAreaInsets={safeAreaInsets}
// //       />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// // });

// // export default App;
