import {useRef, useState} from 'react';
import {
  Button,
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const data = [...Array(30)].map((_, i) => ({key: i, value: i}));

const App = () => {
  const [isOnMomentumScrollEndCalled, setIsOnMomentumScrollEndCalled] =
    useState(false);
  const flatListRef = useRef<FlatList<{key: number; value: number}>>(null);
  const renderItem: ListRenderItem<{key: number; value: number}> = ({item}) => {
    return (
      <View style={style.item}>
        <Text>{item.value}</Text>
      </View>
    );
  };

  const scrollToIndex = () => {
    flatListRef.current?.scrollToIndex({index: 10, animated: true});
  };

  const scrollToOffset = () => {
    flatListRef.current?.scrollToOffset({offset: 100, animated: true});
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log('onMomentumScrollEnd CALLED');
    setIsOnMomentumScrollEndCalled(true);
  };

  const resetOnMomentumScrollEndCalled = () => {
    setIsOnMomentumScrollEndCalled(false);
  };

  return (
    <SafeAreaView>
      <FlatList
        ref={flatListRef}
        horizontal
        data={data}
        renderItem={renderItem}
        onMomentumScrollEnd={onMomentumScrollEnd}
      />
      <Button title="Scroll to index 10" onPress={scrollToIndex} />
      <Button title="Scroll to offset 100" onPress={scrollToOffset} />
      <Button title="Reset" onPress={resetOnMomentumScrollEndCalled} />
      <Text>
        is onMomentumScrollEnd called :
        {isOnMomentumScrollEndCalled ? 'yes' : 'no'}
      </Text>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    backgroundColor: 'blueviolet',
    justifyContent: 'center',
  },
});

export default App;
