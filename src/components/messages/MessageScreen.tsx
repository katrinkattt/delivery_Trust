import React, {useState, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Linking,
  Platform,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  GiftedChat,
  InputToolbar,
  Actions,
  Send,
} from 'react-native-gifted-chat';
import {useNavigation} from '@react-navigation/native';
import {IChatData} from '../../screens/Messages';
import Body from '../common/Body';
import Header from '../Header';
import {colors} from '../../theme/themes';
import {useSelector} from 'react-redux';
import {getUser} from '../../state/user/selectors';
import socket from '../../socket';
import R from '../../res';
import {useAppDispatch} from '../../hooks/redux';
import axios from 'axios';
import {API_BASE_URL} from '../../res/consts';
const addDocImg = '../../assets/addDoc.png';
const phoneImg = '../../assets/phone-call-svgrepo-com.png';

interface IProps {
  route: {
    params: {
      item: IChatData;
    };
  };
}
//@ts-ignore
const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      primaryStyle={{color: colors.black}}
      containerStyle={{
        padding: 4,
        backgroundColor: Platform.OS === 'ios' ? colors.white : colors.darkBlue,
      }}
    />
  );
};

export const MessageScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const userState = useSelector(getUser);
  const {chats} = useSelector(state => state.chats);
  const {currentChat} = useSelector(state => state.chats);
  const user = {
    _id: userState.user_id,
    name: userState.full_name,
    avatar: 2,
  };
  const item = chats[currentChat];
  const phone = userState.typeInUser ? item?.courierPhone : item?.clientPhone;
  console.log('phone', phone);
  console.log('chat in page', item);
  const generateID = () => Math.random().toString(36).substring(2, 10);

  const messages = item?.messages;
  console.log('mesages in curr chat', messages);
  useEffect(() => {
    socket.emit('join_chat', {
      user_id: userState.user_id,
      chat_id: item?.chatId,
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    console.log('messages in onSend', messages);

    socket.emit('send_message', {
      chat_id: item?.chatId,
      room_id: item?.chatId,
      user_id: user?._id,
      user_name: user?.name,
      user_avatar: user.avatar,
      text: messages[0]?.text,
      createdAt: messages[0]?.createdAt,
      user: {avatar: user.avatar, name: user?.name, id: user?._id},
    });
  }, []);

  const onSendImg = useCallback((url: string) => {
    console.log('messages IMG in onSend', messages);
    socket.emit('send_message', {
      chat_id: item?.chatId,
      room_id: item?.chatId,
      user_id: user?._id,
      user_name: user?.name,
      user_avatar: user.avatar,
      text: '',
      user: {avatar: user.avatar, name: user?.name, id: user?._id},
      file: url,
      image: url,
    });
  }, []);

  const renderSend = props => (
    <Send {...props}>
      <Text style={{fontSize: 26, color: '#aaa'}}>➤</Text>
    </Send>
  );
  const handleDocumentSelection = useCallback(async () => {
    // const createdAt = new Date();
    try {
      const response = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.images],
        mode: 'import',
        copyTo: 'documentDirectory',
      });
      let imgRegex = /image/g;
      console.log('FULL response', response);
      // let str = response?.type;
      // if (str?.match(imgRegex)) {
      const formData = new FormData();
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? response?.fileCopyUri
            : response?.fileCopyUri.replace('file://', ''),
        name: response?.name,
        type: response?.type,
      });
      axios
        .post(API_BASE_URL + '/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          console.log('response', response);

          if (response.status == 200) {
            const data = response.data;
            console.log('URL загруженного изображения: ${data.imageUrl}', data);
            onSendImg(data.file_url);
          } else {
            console.log('Ошибка при загрузке изображения: ${response.status}');
          }
        });
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const renderActions = props => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Actions
          {...props}
          icon={() => (
            <Image
              source={require(addDocImg)}
              style={{width: 18, resizeMode: 'contain', marginTop: -10}}
            />
          )}
          options={{
            ['Прикрепить фото']: async () => {
              try {
                handleDocumentSelection();
              } catch (e) {
                if (DocumentPicker.isCancel(e)) {
                  console.log('User cancelled!');
                } else {
                  throw e;
                }
              }
            },
            ['Отменить']: () => {
              console.log('Cancel');
            },
          }}
        />
        <Actions
          {...props}
          options={{
            Позвонить: () => Linking.openURL(`tel:${phone}`),
          }}
          icon={() => (
            <Image
              source={require(phoneImg)}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
        />
      </View>
    );
  };

  // const CustomAudioComponent = props => {
  //   return (
  //     <TouchableOpacity
  //       onPress={() => {
  //         console.log('PRESS AUDIO LISTEN');

  //         const sound = new Sound(props?.currentMessage?.audio, error => {
  //           if (error) {
  //             console.log('Failed to load the sound', error);
  //             return;
  //           }
  //           // if Звук успешно загружен, можно воспроизводить
  //           sound.play();
  //         });
  //       }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           paddingHorizontal: 6,
  //         }}>
  //         <Text style={{color: '#fff', fontSize: 26}}>ᐉ</Text>
  //         <Text style={{marginVertical: 8}}>
  //           {props?.currentMessage?.duration} sec
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const renderCustomView = props => {
    if (props?.currentMessage?.file_type) {
      return (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(
              decodeURIComponent(props.currentMessage.attachment.url),
            );
          }}
          style={{
            backgroundColor: colors.lavender,
            height: 40,
            borderRadius: 10,
          }}>
          {/* <Link */}
          <Image source={{uri: props.currentMessage.attachment.url}} />
          <Text style={{color: '#fff', padding: 10}}>
            {props?.currentMessage.name}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  };

  return (
    <View style={styles.content}>
      <Header title={item?.name || ''} style={styles.header} />
      <Body center light color="rgba(0, 0, 0, 0.44)">
        {item?.name == 'Служба поддержки' ? 'Онлайн' : 'Недавно'}
      </Body>
      <View style={{paddingHorizontal: 30}}>
        <TouchableOpacity
          onPress={() =>
            userState.typeInUser
              ? //@ts-ignore
                navigation.navigate('ClientOrderStack')
              : //@ts-ignore
                navigation.navigate('OrderStack')
          }
          style={{
            paddingVertical: 20,
            paddingHorizontal: 8,
            backgroundColor: '#F7F9FD',
          }}>
          <Body size={16} color="rgba(85, 85, 85, 1)" center>
            Перейти к заказам ...
          </Body>
        </TouchableOpacity>
      </View>
      <GiftedChat
        scrollToBottom
        renderActions={props => renderActions(props)}
        renderCustomView={props => renderCustomView(props)}
        renderSend={renderSend}
        minInputToolbarHeight={33}
        maxInputLength={32}
        renderInputToolbar={customtInputToolbar}
        placeholder="Сообщение"
        alwaysShowSend={true}
        isKeyboardInternallyHandled={true}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        messagesContainerStyle={styles.messeg}
        renderAvatarOnTop={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'ios' ? 24 : 0,
  },
  hashtag: {
    borderWidth: 1,
  },
  messeg: {
    backgroundColor: 'white',
    paddingBottom: 30,
  },
  quik: {
    height: 30,
  },
  header: {
    paddingRight: 30,
    marginBottom: 0,
  },
  textHead: {},
  chatMain: {
    borderWidth: 1,
    backgroundColor: 'red',
  },
  wrapper: {
    borderWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  webView: {
    flex: 1,
    ...Platform.select({
      android: {
        marginTop: 20, // Добавьте это значение для обработки проблемы с WebView на Android
      },
    }),
  },
});
