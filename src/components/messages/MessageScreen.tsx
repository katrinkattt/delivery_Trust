import React, {useState, useCallback} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
// import {renderBubble, renderMessageText} from './feyk';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import {IChatData} from '../../screens/Messages';
import Body from '../common/Body';
import Header from '../Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../theme/themes';

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
  const {item} = route.params;
  const [messages, setMessages] = useState([]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

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
        // renderMessage={() => (
        //     <View style={{ backgroundColor: 'red', height: 30 }}>
        //         <Body>dadada</Body>
        //     </View>
        // )}
        // renderCustomView={BubbleChat}

        // renderChatEmpty={BubbleChat}
        // renderMessageText={renderMessageText}
        // renderSystemMessage={customSystemMessage}
        // renderBubble={renderBubble}
        minInputToolbarHeight={33}
        maxInputLength={32}
        renderInputToolbar={props => customtInputToolbar(props)}
        placeholder="Сообщение"
        alwaysShowSend={true}
        isKeyboardInternallyHandled={true}
        showUserAvatar={true}
        showAvatarForEveryMessage={true}
        // messagesContainerStyle={styles.messeg}
        // quickReplyStyle={styles.quik}
        // scrollToBottomStyle={styles.quik}
        renderAvatarOnTop={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'dada',
          avatar: require('../../assets/use.png'),
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
    paddingHorizontal: 15,
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
