import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ImageSourcePropType,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import Header from '../components/Header';
import {Space} from '../components/common/Space';
import ChatItem from '../components/ChatItem';
import {SearchIcon} from '../components/common/Svgs';
import Body from '../components/common/Body';
import {colors} from '../theme/themes';
import {useSelector} from 'react-redux';
import {ScrollView} from 'react-native-gesture-handler';
import {getUser} from '../state/user/selectors';
import {loadChat} from '../state/chat/action';
import {useAppDispatch} from '../hooks/redux';

export interface IChatData {
  id?: string | number;
  name?: string;
  messageLast?: string;
  image?: ImageSourcePropType;
  read?: boolean;
  messenger?: boolean;
  messages?: IMsg[];
}
export interface IMsg {
  createdAt?: string;
  text?: string | undefined;
  user?: {avatar: number; name: string; _id: number};
  _id?: number;
}

export default function Messages() {
  const [text, setText] = useState<string>('');
  const dispatch = useAppDispatch();
  const user = useSelector(getUser);
  const {chats} = useSelector(state => state.chats);
  async function handleChange(e: string) {
    setText(e);
  }
  const chatRooms = text
    ? chats.filter(item => item.name.match(text))
    : chats || [];

  const [refreshing, setRefreshing] = useState(false);
  const reload = () => {
    dispatch(
      loadChat({
        id: user.user_id,
        onSuccess: () => {
          console.log('good loadChat');
          setRefreshing(false);
        },
        onError: async e => {
          console.log('ERR loadChat', e);
          setRefreshing(false);
        },
      }),
    );
  };
  const onRefresh = useCallback(() => {
    console.log('refresh');
    setRefreshing(true);
    reload();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title="Чат" style={{paddingRight: 40, marginBottom: 0}} />
      <Space height={27} />
      <View style={styles.inputBox}>
        <TouchableOpacity activeOpacity={0.8}>
          <SearchIcon width={22} height={22} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          value={text}
          placeholder="Поиск по чату"
          placeholderTextColor="#A1ADBF"
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        {chatRooms?.length > 0 ? (
          chatRooms.map((item, keyChat) => (
            <ChatItem item={item} keyChat={keyChat} key={item.chatId} />
          ))
        ) : (
          <View style={styles.nonChats}>
            <Body color={colors.darkBlue}>Сообщений пока нет</Body>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  recipientFormContainer: {
    paddingHorizontal: 17,
  },

  row: {
    flexDirection: 'row',
  },
  rowInput: {
    flex: 1,
  },
  offLine: {
    // position: 'absolute',
  },
  inputBox: {
    width: '100%',
    height: 52,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FD',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#E8E8F0',
    paddingLeft: 14,
    paddingHorizontal: 21,
    overflow: 'hidden',
    marginBottom: 15,
    marginHorizontal: 15,
  },
  input: {
    width: '100%',
    fontSize: 15,
    backgroundColor: '#F7F9FD',
    color: '#424242',
    paddingLeft: 11,
    paddingRight: 15,
  },
  searchText: {
    fontWeight: '400',
    fontSize: 15,
    color: '#5B5B5B',
  },
  main: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8F0',
    marginHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 21,
    paddingHorizontal: 11,
    flexDirection: 'row',
    marginVertical: 0,
    backgroundColor: 'rgba(249, 252, 238, 1)',
  },
  image: {
    width: 25,
    height: 25,
  },
  nonChats: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
});
