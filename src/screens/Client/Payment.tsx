import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Linking} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Header from '../../components/Header';
import Body from '../../components/common/Body';
import Button from '../../components/common/Button';
import {CopyIcon} from '../../../assets/icons/CopyIcon';
import {ModalCustom} from '../../components/ModalCustom';
import {useDispatch, useSelector} from 'react-redux';
import {
  TerminalKey,
  PasswordTerm,
  PAY_TINKOFF,
  INIT_PAY,
  OPEN_KEY,
  ThreDS_PAY,
} from '../../api/TinkoffAPI';
import {sha256} from 'react-native-sha256';
import {RSA} from 'react-native-rsa-native';
import {encode} from 'base-64';
import axios from 'axios';
import {Space} from '../../components/common/Space';

interface PeymentProps {
  route: {
    params: {
      id_method?: number;
      price?: number;
    };
  };
}
export default function Payment({route}: PeymentProps) {
  const id_method = route.params?.id_method;
  const price = route.params?.price;
  const title =
    (id_method === 1 ? 'QR-код' : id_method === 2 ? 'Карта' : 'Криптовалюта') ||
    'Pay';
  const disp = useDispatch();
  const linkOR = 'https://www.youtube.com/watch?v=KLxNkEN-2Uc'; //from back
  const CryptoKey = '18wCxszZc8mZk7smgfv5Gp4eCNACHYq6Q';
  const [payErr, setPayErr] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const order = useSelector(state => state.order);
  const newOrder = order?.newOrder;
  const user = useSelector(state => state.user);
  const currCard = user?.cards[user?.curCard];
  const [initHashToken, setInitHashToken] = useState('');
  const [paymentId, setPaymentId] = useState(0);
  const [cardData, setCardData] = useState('');
  const [checkTokenHash, setCheckTokenHash] = useState('');
  const orderId = 12345;

  const headers = {
    'Content-Type': 'application/json',
    Cookie:
      'merchant_api_cookieId=650e13c4-aab8-4064-9ed7-406d7b2ba28f; JSESSIONID=node016zgjovmqcjr07wwkwmi10bsh11098574.node0',
  };
  const request3DS = data => {
    const options = {
      method: 'POST',
      headers: headers,
      data: data,
      url: PAY_TINKOFF + ThreDS_PAY,
    };
    axios(options)
      .then(response => {
        console.log(response.data);
        setPaymentId(parseInt(response.data?.PaymentId));
        if (response.data?.Success) {
          console.log('Success');
        }
      })
      .catch(error => console.log('error REQUEST', error));
  };
  const encryptData = async (data: string, publicKey: string) => {
    // const keyPub = `-----BEGIN RSA PUBLIC KEY------/r/n${publicKey}/r/n-----END RSA PUBLIC KEY-----/r/n`;
    // RSA.generate()
    //   .then(() => {
    console.log('2048 publiс_KEY====>', publicKey); // the public key
    try {
      RSA.encrypt(data, publicKey)
        .then(encodedMessage => {
          console.log(`THE ENCODED DATA!!! ${encodedMessage}`);
          setCardData(encodedMessage);
          const checkToken = `${encodedMessage}${paymentId}${TerminalKey}`;
          sha256(checkToken).then(hash => {
            setCheckTokenHash(hash);
            console.log('setCheckTokenHash');
          });
        })
        // })
        .catch(e => console.log('err', e));
    } catch {
      console.log('err');
    }
  };
  const Check3ds = () => {
    const card = `PAN=${currCard?.number.replaceAll(
      ' ',
      '',
    )};ExpDate=${currCard?.dateEnd.replace('/', '')};CardHolder=${
      currCard?.name
    };CVV=${currCard?.cvv}`;

    console.log(card, '//CARD');
    console.log(cardData, '//card DATA crypt');
    const data3DS = {
      PaymentId: paymentId,
      TerminalKey: TerminalKey,
      CardData: cardData,
      Token: checkTokenHash,
    };
    console.log(data3DS, 'data3DS');
    encryptData(card, OPEN_KEY).then(() => request3DS(data3DS));
  };

  const payInit = () => {
    const priceInFormat = parseInt(newOrder?.price.replace('.', '')); //price с копейками
    const initKey = `${priceInFormat}Услуги доставки${orderId}${PasswordTerm}${TerminalKey}`;
    console.log(initKey, '//initKey');

    sha256(initKey).then(hash => {
      setInitHashToken(hash);
      if (initHashToken != '') {
        reqestInint();
      }
    });
    console.log(initHashToken);
    const reqestInint = () => {
      const options = {
        method: 'POST',
        headers: headers,
        data: data,
        url: PAY_TINKOFF + INIT_PAY,
      };
      axios(options)
        .then(response => {
          console.log(response.data);
          setPaymentId(parseInt(response.data?.PaymentId));
          if (response.data?.PaymentId) {
            Check3ds();
          }
        })
        .catch(error => console.log('error', error));
    };

    const data = {
      TerminalKey: TerminalKey,
      Amount: priceInFormat,
      OrderId: '21090',
      Description: 'Услуги доставки',
      Token: initHashToken,
      DATA: {
        Phone: user?.phone,
        Email: user?.email,
      },
      Receipt: {
        Email: user?.email,
        Phone: user?.phone,
        Taxation: 'osn',
        Items: [
          {
            Name: 'Услуги доставки',
            Price: priceInFormat,
            Quantity: 1,
            Amount: priceInFormat,
            Tax: 'vat10',
          },
        ],
      },
    };
  };

  const pay = () => {
    if (id_method === 1) {
      Linking.openURL(linkOR);
    }
    if (id_method === 2) {
      console.log('card Pay');
      payInit();
      // Linking.openURL(linkBank);
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
          <TouchableOpacity onLongPress={pay}>
            <QRCode value={linkOR} size={230} />
          </TouchableOpacity>
        )}
        <Body bold semiBold size={36} style={{marginTop: 20}}>
          {price} ₽
        </Body>
        <Body size={11}>Стоимость с учетом НДС</Body>
        <Space height={20} />
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
