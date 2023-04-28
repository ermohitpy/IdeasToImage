import { StyleSheet,StatusBar,View,Platform } from 'react-native';
import Navigator from './src/Navigator';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator />
      <FlashMessage
        type={'danger'}
        duration={5000}
        position={
          Platform.OS === 'ios'
            ? 'top'
            : styles.position
        }
        floating={Platform.OS !== 'ios'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  position: {
    top: StatusBar.currentHeight, left: 0, right: 0
  }
})
