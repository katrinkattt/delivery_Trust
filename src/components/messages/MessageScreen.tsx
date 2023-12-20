import React, { useState, useCallback, useEffect } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { IChatData } from '../../screens/Messages';
import Body from '../common/Body';
import Header from '../Header';
import { colors } from '../../theme/themes';
import { useSelector } from 'react-redux';
import { getUser } from '../../state/user/selectors';
import socket from '../../socket';
import R from '../../res';
import { useAppDispatch } from '../../hooks/redux';
import axios from 'axios';
import { API_BASE_URL } from '../../res/consts';
// import moment from 'moment';
import moment from 'moment-with-locales-es6';
const addDocImg = '../../assets/addDoc.png';
const phoneImg = '../../assets/phone-call-svgrepo-com.png';

interface IProps {
  route: {
    params: {
      item: IChatData;
    };
  };
}
moment.locale('ru');
//@ts-ignore
const customtInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      primaryStyle={{ color: colors.black }}
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
  const { chats } = useSelector(state => state.chats);
  const { currentChat } = useSelector(state => state.chats);
  const { typeInUser } = useSelector(getUser);
  const user = {
    _id: userState.user_id,
    name: userState.full_name,
    avatar: userState?.typeInUser ? 1 : 2,
  };
  const item = chats[currentChat];
  const phone = userState.typeInUser ? item?.courierPhone : item?.clientPhone;
  console.log('phone', phone);
  console.log('chat in page', item);
  // const generateID = () => Math.random().toString(36).substring(2, 10);

  const [photoMSG, setPhotoMSG] = useState('');
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
    if (messages[0]?.text !== '') {
      socket.emit('send_message', {
        chat_id: item?.chatId,
        room_id: item?.chatId,
        user_id: user?._id,
        user_name: user?.name,
        user_avatar: user.avatar,
        text: messages[0]?.text,
        createdAt: messages[0]?.createdAt,
        user: { avatar: user.avatar, name: user?.name, id: user?._id },
      });
    }

  }, []);

  const onSendImg = useCallback((url: string, messages = []) => {
    console.log('messages IMG in onSend', messages);
    console.log('photoMSG in onSendImg===>', photoMSG);
    if (url) {
      socket.emit('send_message', {
        chat_id: item?.chatId,
        room_id: item?.chatId,
        user_id: user?._id,
        user_name: user?.name,
        user_avatar: user.avatar,
        text: messages[0]?.text || '',
        user: { avatar: user.avatar, name: user?.name, id: user?._id },
        file: url,
        image: url,
      });
      setPhotoMSG('')
    }

  }, []);

  const renderSend = props => {
    console.log('prop renderSend:::', props);

    return (
      <Send {...props}>
        {!props?.text ? (<TouchableOpacity onPress={() => onSendImg(photoMSG, [])} >
          <Text style={{ fontSize: 26, color: '#aaa' }}>➤</Text>
        </TouchableOpacity>) : <Text style={{ fontSize: 26, color: '#aaa' }}>➤</Text>}
      </Send>
    )
  };

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
            setPhotoMSG(data.file_url)
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
      <View style={{ flexDirection: 'row' }}>
        <Actions
          {...props}
          icon={() => (
            <Image
              source={require(addDocImg)}
              style={{ width: 18, resizeMode: 'contain', marginTop: -10 }}
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
          <Image source={{ uri: props.currentMessage.attachment.url }} />
          <Text style={{ color: '#fff', padding: 10 }}>
            {props?.currentMessage.name}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  };
  const opponentMsg = messages.filter(item => item.user._id !== user._id)
  const onlineTime = opponentMsg[0] ? opponentMsg[0].createdAt : false;
  const onlineStatus = !!onlineTime ? moment(onlineTime).format('LT') + ' '
    + moment(onlineTime).calendar() : 'Недавно';

  return (
    <View style={styles.content}>
      <Header title={item?.name || ''} style={styles.header} />
      <View style={styles.avatarContainer} >
        <Image
          source={{ uri: typeInUser ? item.courierAvatar : item.clientAvatar }}
          style={styles.image}
        />
      </View>

      <Body center light color="rgba(0, 0, 0, 0.44)">
        {item?.name == 'Служба поддержки' ? 'Онлайн' : 'В сети ' + onlineStatus}
      </Body>
      <View style={{ paddingHorizontal: 30 }}>
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
        placeholder={!!photoMSG ? "Фото загружено" : "Сообщение"}
        alwaysShowSend={true}
        isKeyboardInternallyHandled={true}
        showUserAvatar={false}
        showAvatarForEveryMessage={false}
        messagesContainerStyle={styles.messeg}
        renderAvatar={() => (
          <View style={[styles.image, { backgroundColor: colors.lavender }]}>
            <Image
              source={{ uri: item.courierAvatar }}
              style={styles.image}
            />
          </View>
        )}
        messages={messages}
        onSend={messages => { photoMSG !== '' ? onSendImg(photoMSG, messages) : onSend(messages) }}
        user={{
          _id: user._id,
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
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.lavender,
    position: 'absolute',
    marginTop: 50,
    right: 20
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 20,
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
