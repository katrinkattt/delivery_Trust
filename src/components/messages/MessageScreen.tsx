import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Platform, Image, Text} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {GiftedChat, InputToolbar, Actions} from 'react-native-gifted-chat';
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

  const handleDocumentSelection = useCallback(async () => {
    const createdAt = new Date();
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      let imgRegex = /image/g;
      let sendObjDoc = {
        _id: messages.length + 1,
        text: '',
        createdAt: new Date(),
        user,
        name: response[0].name,
        file: response[0]?.uri,
        file_type: 'pdf' || 'docx',
        attachment: {
          url: response[0].fileCopyUri,
          type: 'pdf' || 'docx',
        },
      };
      let sendObjPict = {
        createdAt,
        _id: messages.length + 1,
        text: response[0]?.name,
        user,
        file: response[0]?.uri,
        image: response[0]?.uri,
      };
      let str = response[0]?.type;
      if (str?.match(imgRegex)) {
        // @ts-ignore
        onSend([sendObjPict]);
      } else {
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
            ['Document']: async () => {
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
        />
      </View>
    );
  };
  const renderCustomView = props => {
    if (props?.currentMessage?.file_type) {
      return (
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: colors.lavender,
            height: 40,
            borderRadius: 10,
          }}>
          <Text style={{color: '#fff', padding: 10}}>
            {props?.currentMessage.name}
          </Text>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  };

  // const getSource = message => {
  //   if (message && message.currentMessage) {
  //     return message.currentMessage.audio
  //       ? message.currentMessage.audio
  //       : message.currentMessage.video
  //       ? message.currentMessage.video
  //       : null;
  //   }
  //   return null;
  // };
  // const renderAudio = message => {
  //   const source = getSource(message);
  //   if (source) {
  //     return (
  //       <View style={{height: 30}} key={message.currentMessage._id}>
  //         {Platform.OS === 'ios' ? (
  //           <Video
  //             style={styles.videoElement}
  //             shouldPlay
  //             height={156}
  //             width={242}
  //             muted={true}
  //             source={{uri: source}}
  //             allowsExternalPlayback={false}></Video>
  //         ) : (
  //           <VideoPlayer style={styles.videoElement} source={{uri: source}} />
  //         )}
  //       </View>
  //     );
  //   }
  //   return <></>;
  // };

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
        // renderMessageAudio={renderAudio}
        minInputToolbarHeight={33}
        maxInputLength={32}
        renderInputToolbar={props => customtInputToolbar(props)}
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
});
