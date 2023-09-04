import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import Body from './common/Body';
import {IChatData} from '../screens/Messages';
import {Space} from './common/Space';
import {ChatRead, ChatUnRead} from './common/Svgs';
import {useNavigation} from '@react-navigation/native';
import R from '../res';
import {setCurrentChat} from '../state/chat/slice';
import {useDispatch} from 'react-redux';
import {IChatState} from '../state/chat/types';

interface IData {
  item: IChatState;
  keyChat: number;
}

export default function ChatItem({item, keyChat}: IData) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const pressChat = () => {
    //@ts-ignore
    navigation.navigate(R.routes.MESSAGE_SCREEN);
    console.log('keyChat', keyChat);
    dispatch(setCurrentChat({num: keyChat}));
  };
  return (
    <>
      <TouchableOpacity
        style={item.name ? styles.mainF : styles.main}
        activeOpacity={0.5}
        onPress={pressChat}>
        {item.name ? (
          <View
            style={{
              backgroundColor: 'rgba(209, 234, 122, 1)',
              padding: 14,
              borderRadius: 100,
            }}>
            <Image
              source={item.image}
              style={item.messenger ? styles.imageMessenger : styles.image}
            />
          </View>
        ) : (
          <Image source={item.image} style={styles.image} />
        )}
        <Space width={13} />
        <View>
          <Body bold size={16}>
            {item.name}
          </Body>

          <Space height={5} />

          <Body size={15} light color="rgba(36, 55, 87, 1)">
            {item.messageLast || 'Сообщений пока нет'}
          </Body>
        </View>
        {item.messenger ? (
          <View style={{position: 'absolute', right: 15, top: '50%'}}>
            <Body>12:14</Body>
            <Space height={7} />
            <View style={styles.notif}>
              <Body size={12} color="white">
                2
              </Body>
            </View>
          </View>
        ) : (
          <View style={{position: 'absolute', right: 15, top: '50%'}}>
            <Body>12:14</Body>
            <Space height={7} />
            {item.read ? <ChatRead /> : <ChatUnRead />}
          </View>
        )}
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8F0',
    marginHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 21,
    paddingHorizontal: 11,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'rgba(247, 249, 253, 1)',
  },
  mainF: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E8E8F0',
    marginHorizontal: 15,
    paddingTop: 17,
    paddingBottom: 21,
    paddingHorizontal: 11,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'rgba(249, 252, 238, 1)',
  },
  image: {
    width: 39,
    height: 39,
  },
  imageMessenger: {
    width: 25,
    height: 25,
  },
  notif: {
    backgroundColor: 'rgba(47, 128, 237, 1)',
    alignItems: 'center',
    // justifyContent: 'center',
    // height: 17,
    // width: 17,
    paddingVertical: 2,
    paddingHorizontal: 7,
    borderRadius: 100,
    alignSelf: 'flex-end',
  },
});
