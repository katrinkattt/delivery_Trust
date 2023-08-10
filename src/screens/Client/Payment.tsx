import React, {useState} from 'react';
import {TouchableOpacity, View, Linking} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Header from '../../components/Header';
import Body from '../../components/common/Body';
import Button from '../../components/common/Button';
import {CopyIcon} from '../../../assets/icons/CopyIcon';
import {ModalCustom} from '../../components/ModalCustom';

interface PeymentProps {
  route: {
    params: {
      id_method: number;
    };
  };
}
export default function Payment({route}: PeymentProps) {
  const id_method = route.params?.id_method;
  const title =
    (id_method === 1 ? 'QR-код' : id_method === 2 ? 'Карта' : 'Криптовалюта') ||
    'Pay';
  const price = 489; //from state
  const linkOR = 'https://www.youtube.com/watch?v=KLxNkEN-2Uc'; //from back
  const linkBank = 'https://sbp.nspk.ru/';
  const CryptoKey = '18wCxszZc8mZk7smgfv5Gp4eCNACHYq6Q';
  const [payErr, setPayErr] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);

  const pay = () => {
    if (id_method === 1) {
      Linking.openURL(linkOR);
    }
    if (id_method === 2) {
      Linking.openURL(linkBank);
    } else {
      checkCrypto();
    }
  };

  const copyToClipboard = () => {
    setPayErr(false); //пока так
    Clipboard.setString(CryptoKey);
  };

  const checkCrypto = () => {
    setVisibleStatus(true);
    setTimeout(() => {
      setVisibleStatus(false);
    }, 800);
  };

  return (
    <View style={{flex: 1}}>
      <Header title={title} />
      <ModalCustom
        modalVisible={visibleStatus}
        text={
          payErr ? 'Транзакция не обнаружена' : 'Транзакция успешно проведена'
        }
        succes={!payErr}
        err={payErr}
      />
      <View
        style={{
          marginHorizontal: 15,
          alignItems: 'center',
        }}>
        {id_method === 3 && (
          <Button
            renderContent={() => (
              <>
                <Body
                  style={{marginRight: 10}}
                  semiBold
                  color="rgba(255, 255, 255, 1)"
                  size={15}>
                  СКОПИРОВАТЬ КОШЕЛЕК
                </Body>
                <CopyIcon />
              </>
            )}
            onPress={copyToClipboard}
            buttonType={1}
          />
        )}
        {id_method === 1 && (
          <TouchableOpacity onLongPress={() => Linking.openURL(linkOR)}>
            <QRCode value={linkOR} size={230} />
          </TouchableOpacity>
        )}
        <Body bold semiBold size={36} style={{marginTop: 20}}>
          {price} ₽
        </Body>
        <Body size={11}>Стоимость с учетом НДС</Body>
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          padding: 15,
        }}>
        <Button
          text={id_method === 3 ? 'ПРОВЕРИТЬ ОПЛАТУ' : 'ОПЛАТИТЬ'}
          onPress={pay}
          buttonType={2}
        />
      </View>
    </View>
  );
}
