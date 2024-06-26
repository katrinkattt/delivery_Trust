import React, {useEffect, useState} from 'react';
import {StatusBar, TextInput, TouchableOpacity, View} from 'react-native';
import {SearchIcon} from '../components/common/Svgs';
import {ScaledSheet} from 'react-native-size-matters/extend';
import TabViewExample from '../components/TabView';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {getUser} from '../state/user/selectors';
import {useAppDispatch} from '../hooks/redux';
import {loadOrder} from '../state/orders/action';

export default function Orders() {
  const {searchInput, id} = useSelector(getUser);
  const [text, setText] = useState<string>('');
  const [index, setIndex] = useState(0);
  const dispatch = useAppDispatch();

  const routes = [
    {key: 'first', title: 'Мои заказы'},
    {key: 'second', title: 'Найти заказ'},
  ];
  useEffect(() => {
    if (id !== 0) {
      dispatch(
        loadOrder({
          link: `/courier/${id}`,
          onSuccess: () => {
            console.log('good loadOrders');
          },
          onError: async e => {
            console.log('ERR loadOrders =>>', e);
          },
        }),
      );
    }
  }, []);
  // chats.filter(item => item.name.match(text))
  console.log('text', text);

  async function handleChange(e: string) {
    setText(e);
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
        <Header title={routes[index]?.title} />

        <View style={styles.inputBox}>
          <TouchableOpacity activeOpacity={0.8}>
            <SearchIcon width={22} height={22} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={text}
            placeholder="Поиск по заказам"
            placeholderTextColor="#A1ADBF"
          />
        </View>
      </View>

      <TabViewExample routes={routes} setIndex={setIndex} index={index} />
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  inputBox: {
    width: '100%',
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FD',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8E8F0',
    paddingLeft: 14,
    paddingHorizontal: 21,
    overflow: 'hidden',
  },
  input: {
    width: '100%',
    fontSize: 15,
    backgroundColor: '#F7F9FD',
    color: '#424242',
    paddingLeft: 11,
    paddingRight: 15,
  },
});
