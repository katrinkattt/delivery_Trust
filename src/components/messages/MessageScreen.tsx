import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Linking, Platform, Image, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {
  GiftedChat,
  InputToolbar,
  Actions,
  Send,
} from 'react-native-gifted-chat';
import Sound from 'react-native-sound';
import AudioRecord from 'react-native-audio-record';
import {IChatData} from '../../screens/Messages';
import Body from '../common/Body';
import Header from '../Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../theme/themes';

const addDocImg = '../../assets/addDoc.png';
const microImg = '../../assets/microChat.png';

interface IProps {
  route: {
    params: {
      item: IChatData;
    };
  };
}
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

export const MessageScreen = ({route}: IProps) => {
  const user = {
    _id: 1,
    name: 'Jacky',
    avatar: require('../../assets/use.png'),
  };
  const {item} = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = props => (
    <Send {...props}>
      <Text style={{fontSize: 26, color: '#aaa'}}>➤</Text>
    </Send>
  );
  const handleDocumentSelection = useCallback(async () => {
    const createdAt = new Date();
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      let imgRegex = /image/g;
      console.log('FULL response', response);

      let str = response[0]?.type;
      if (str?.match(imgRegex)) {
        let sendObjPict = {
          createdAt,
          _id: messages.length + 1,
          text: '',
          user,
          file: response[0]?.uri,
          image: response[0]?.uri,
        };
        console.log('obj IMG', sendObjPict);
        // @ts-ignore
        onSend([sendObjPict]);
      } else {
        let sendObjDoc = {
          _id: messages.length + 1,
          text: '',
          createdAt: new Date(),
          user,
          name: response[0].name,
          file: response[0]?.uri,
          file_id: response[0]?.size,
          file_type: response[0]?.type,
          attachment: {
            url: response[0].uri,
            type: response[0]?.type,
          },
        };
        console.log('obj DOC', sendObjDoc);
        // @ts-ignore
        onSend([sendObjDoc]);
      }
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
            ['File']: async () => {
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
            Cancel: () => {
              console.log('Cancel');
            },
          }}
        />
        <Actions
          {...props}
          icon={() => (
            <Image
              source={require(microImg)}
              style={{width: 22, resizeMode: 'contain', marginTop: -10}}
            />
          )}
          onPressActionButton={handleVoiceSend}
        />
      </View>
    );
  };
  const handleVoiceSend = (voiceUri, voiceDuration) => {
    // const [isRecording, setIsRecording] = useState(false);

    // const handleRecordPress = () => {
    //   if (!isRecording) {
    //     startRecording();
    //   } else {
    //     stopRecording();
    //   }
    // };

    // const startRecording = () => {
    //   setIsRecording(true);
    //   // AudioRecord.start();
    // };

    // const stopRecording = () => {
    //   setIsRecording(false);
    //   // AudioRecord.stop();
    // };

    const audioMessage = {
      _id: messages.length + 1,
      audio: voiceUri,
      duration: voiceDuration,
      createdAt: new Date(),
      user,
    };
    //@ts-ignore
    onSend([audioMessage]);
  };

  const CustomAudioComponent = props => {
    return (
      <TouchableOpacity
        onPress={() => {
          const sound = new Sound(props?.currentMessage?.audio, error => {
            if (error) {
              console.log('Failed to load the sound', error);
              return;
            }
            // if Звук успешно загружен, можно воспроизводить
            sound.play();
          });
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 6,
          }}>
          <Text style={{color: '#fff', fontSize: 26}}>ᐉ</Text>
          <Text style={{marginVertical: 8}}>
            {props?.currentMessage?.duration} sec
          </Text>
        </View>
      </TouchableOpacity>
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
      <Header title="Егор Т." icon={true} style={styles.header} />
      <Body center light color="rgba(0, 0, 0, 0.44)">
        Офлайн: 3 часа
      </Body>
      <View style={{paddingHorizontal: 30}}>
        <TouchableOpacity
          style={{
            paddingVertical: 20,
            paddingHorizontal: 8,
            backgroundColor: '#F7F9FD',
          }}>
          <Body size={16} color="rgba(85, 85, 85, 1)" center>
            Перейти в заказ Доставка письма...
          </Body>
        </TouchableOpacity>
      </View>
      <GiftedChat
        scrollToBottom
        renderActions={props => renderActions(props)}
        renderCustomView={props => renderCustomView(props)}
        renderMessageAudio={props => <CustomAudioComponent {...props} />}
        // renderMessageAudio={renderAudio}
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
