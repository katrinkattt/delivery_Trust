import {ReactNode} from 'react';
import {View, Modal, Image} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import Body from './common/Body';
import {colors} from '../theme/themes';
const del = '../assets/xIcon.png';
const succ = '../assets/succes.png';

export const ModalCustom = ({
  children,
  modalVisible,
  err,
  succes,
  text,
}: {
  children?: ReactNode;
  modalVisible: boolean;
  err?: boolean;
  succes?: boolean;
  text?: string;
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {children}
          {err && (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require(del)}
                style={{width: 80, resizeMode: 'contain'}}
              />
              <Body
                color="rgba(246, 111, 100, 1)"
                bold
                style={{fontWeight: 'bold'}}>
                {text}
              </Body>
            </View>
          )}
          {succes && (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require(succ)}
                style={{width: 80, resizeMode: 'contain'}}
              />
              <Body color={colors.darkBlue} bold style={{fontWeight: 'bold'}}>
                {text}
              </Body>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
const styles = ScaledSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 26,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
