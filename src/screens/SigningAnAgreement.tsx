import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Linking} from 'react-native';
import Body from '../components/common/Body';
import {ScaledSheet} from 'react-native-size-matters/extend';
import {DownloadIcon, TreatyIcon} from '../components/common/Svgs';
import Button from '../components/common/Button';
import DropShadow from 'react-native-drop-shadow';
import Header from '../components/Header';
import {useNavigation} from '@react-navigation/native';
import {ModalCustom} from '../components/ModalCustom';
import {colors} from '../theme/themes';
import CustomCheckbox from '../components/common/CustomCheckbox';
import R from '../res';

export default function SigningAnAgreement() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [agre, setAgre] = useState(false);
  const dogovorLink =
    'https://docs.google.com/document/d/1rFlzbOIpHG9Hcz_dKfmSiH21RJ75bM1c7G2nSu7LTyI/edit?usp=sharing';

  const goToAgreement = () => {
    //@ts-ignore
    navigation.navigate(R.routes.AGREEMENT);
  };

  return (
    <>
      <Header title="Подписание договора" />
      <ModalCustom modalVisible={modalVisible} text="">
        <View style={{width: 290}}>
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{alignItems: 'flex-end'}}>
            <Text
              style={{
                marginTop: -20,
                color: colors.lavender,
                fontSize: 26,
              }}>
              ×
            </Text>
          </TouchableOpacity>
          <>
            <Body
              color="#243757"
              bold
              size={16}
              style={{marginBottom: 20, fontWeight: 'bold'}}>
              С договором ознакомился и согласен со всеми условиями, которые
              перечислены в договоре
            </Body>
            <CustomCheckbox
              label={`Согласен/-(на) с условиями${'\n'}договора`}
              style={{marginBottom: 10}}
              onChange={() => setAgre(!agre)}
              val={agre}
              isGreen
            />
            <Button
              onPress={goToAgreement} //link to next
              buttonType={1}
              text="ДАЛЕЕ"
            />
          </>
        </View>
      </ModalCustom>
      <View
        style={{marginTop: 38, flexDirection: 'row', justifyContent: 'center'}}>
        <TreatyIcon width={94} height={133} />
      </View>

      <Body color="#243757" style={styles.description}>
        Мы автоматически сгенерировали для Вас заявление о присоединении к
        сервису выполнения курьерских услуг.
      </Body>

      <Body color="#243757" style={styles.description}>
        Подписание данного заявления и отправка его нам является офертой на
        заключение Договора.
      </Body>

      <DropShadow style={styles.buttonShadow}>
        <Button
          onPress={() => Linking.openURL(dogovorLink)}
          renderContent={() => (
            <>
              <Body
                style={{marginRight: 13}}
                semiBold
                color="rgba(255, 255, 255, 1)"
                size={15}>
                Скачать договор
              </Body>

              <DownloadIcon width={20} height={20} />
            </>
          )}
          buttonType={3}
          text="Скачать договор"
          containerStyle={{width: 259, marginTop: 20}}
        />
      </DropShadow>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          padding: 15,
        }}>
        <DropShadow style={styles.shadow}>
          <View style={{marginTop: 10, paddingHorizontal: 15}}>
            <Button
              onPress={
                () => setModalVisible(true)
                //navigation.navigate('TabScreen')
              }
              buttonType={1}
              text="ПОДПИСАТЬ ЗАЯВЛЕНИЕ"
            />
          </View>
        </DropShadow>
      </View>
    </>
  );
}

const styles = ScaledSheet.create({
  title: {
    width: 245,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    width: '100%',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 15,
    marginTop: 28,
    lineHeight: 24,
  },
  buttonShadow: {
    flexDirection: 'row',
    justifyContent: 'center',

    shadowColor: '#243757',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 19,
    elevation: 5,
  },

  shadow: {
    elevation: 4,
    shadowColor: '#6062DF',
    shadowOpacity: 0.26,
    shadowRadius: 19,
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
});
