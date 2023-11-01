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
  FinishAuthorize_PAY,
} from '../../api/TinkoffAPI';
import {sha256} from 'react-native-sha256';
import {RSA} from 'react-native-rsa-native';
import axios from 'axios';
import {Space} from '../../components/common/Space';
import {colors} from '../../theme/themes';
import {CardModal} from '../../components/CardModal';
import {useAppDispatch} from '../../hooks/redux';
import {createOrder, loadOrder, paymentFunc} from '../../state/orders/action';

interface PeymentProps {
  route: {
    params: {
      id_method?: number;
      price?: number;
    };
  };
}
interface data3DSProp {
  PaymentId: number;
  TerminalKey: string;
  CardData: string;
  Token: string;
}

const PointLoader = ({
  load,
  pointsCount,
}: {
  load: boolean;
  pointsCount: number;
}) => {
  const arr = Array.from(Array(pointsCount).keys());
  const [curPoint, setCurPoint] = useState(0);
  useEffect(() => {
    if (load) {
      const handle = setInterval(() => {
        // *** A function
        setCurPoint(prevTab => {
          if (prevTab == pointsCount) return 0;
          return (prevTab += 1);
        });
      }, 1000);
      return () => {
        // *** Clear the interval on unmount
        clearInterval(handle); // ***
      }; // ***
    }
  }, []);

  return (
    <View style={{flexDirection: 'row', height: 40, width: 80}}>
      {arr.map(item => (
        <View
          style={{
            backgroundColor: item == curPoint && load ? '#fff' : '#767',
            height: 20,
            width: 20,
            borderRadius: 10,
            marginRight: 8,
          }}
        />
      ))}
    </View>
  );
};

export default function Payment({route}: PeymentProps) {
  const id_method = route.params?.id_method;
  const price = route.params?.price;
  const title =
    (id_method === 1 ? 'QR-код' : id_method === 2 ? 'Карта' : 'Криптовалюта') ||
    'Pay';
  const dispatch = useAppDispatch();
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
  const [finishToken, setFinishToken] = useState('');
  const priceInFormat = parseInt(newOrder?.price.replace('.', '')); //price с копейками
  const generateID = new Date();
  const orderId = user?.id + generateID.toISOString();
  const [statusPay, setStatusPay] = useState('');
  const [loading, setloading] = useState(false);

  // console.log('currCard', currCard);

  const headers = {
    'Content-Type': 'application/json',
    Cookie:
      'merchant_api_cookieId=650e13c4-aab8-4064-9ed7-406d7b2ba28f; JSESSIONID=node016zgjovmqcjr07wwkwmi10bsh11098574.node0',
  };
  const reloadOrders = () => {
    dispatch(
      loadOrder({
        link: `/client/${user.id}`,
        onSuccess: () => {
          console.log('good loadOrders');
        },
        onError: async e => {
          console.log('ERR loadOrders =>>', e);
        },
      }),
    );
  };
  const createOrderBack = () => {
    dispatch(
      createOrder({
        data: order.newOrder,
        onSuccess: () => {
          // @ts-ignore
          navigation.navigate('TabScreen');
          reloadOrders();
        },
        onError: async e => {
          console.log('Ошибка сервера', e);
          setStatusPay('Ошибка сервера, попробуйте позже');
        },
      }),
    );
  };
  const reqFinishAuth = async data => {
    const options = {
      method: 'POST',
      headers: headers,
      data: data,
      url: PAY_TINKOFF + FinishAuthorize_PAY,
    };
    await axios(options)
      .then(response => {
        setloading(false);
        console.log('reqFinishAuth', response.data);
        response.data?.Success
          ? (setStatusPay('Оплачено'), createOrderBack())
          : setStatusPay('Ошибка оплаты');
      })
      .catch(error => console.log('error REQUEST', error));
  };

  const finishAuthorize = (data: data3DSProp) => {
    setStatusPay('Подтверждение платежа...');
    setloading(true);
    const dataFinish = {
      TerminalKey: TerminalKey,
      PaymentId: data.PaymentId,
      Token: finishToken,
      SendEmail: true,
      Source: 'cards',
      InfoEmail: user?.email,
      // EncryptedPaymentData: 'string', //google/apple pay = don't work in russia
      CardData: data.CardData,
      Amount: priceInFormat,
      deviceChannel: 'APP',
    };
    const finishKey = `${priceInFormat}${data.CardData}${
      user?.email
    }${paymentId}${true}cards${TerminalKey}`;

    sha256(finishKey).then(hash => {
      setFinishToken(hash);
      const dataFinish = {
        TerminalKey: TerminalKey,
        PaymentId: data.PaymentId,
        Token: hash,
        SendEmail: true,
        Source: 'cards',
        InfoEmail: user?.email,
        // EncryptedPaymentData: 'string', //google/apple pay = don't work in russia
        CardData: data.CardData,
        Amount: priceInFormat,
        deviceChannel: 'APP',
      };
      console.log('dataFinish::', dataFinish);
      if (!!hash || finishKey != '') {
        reqFinishAuth(dataFinish);
      }
    });
  };

  const request3DS = async (data: data3DSProp) => {
    const options = {
      method: 'POST',
      headers: headers,
      data: data,
      url: PAY_TINKOFF + ThreDS_PAY,
    };
    console.log('DATA in request3DS:::', data);

    await axios(options)
      .then(response => {
        console.log('request3DS', response.data);
        if (response.data?.Success) {
          finishAuthorize(data);
        }
      })
      .catch(error => {
        console.log('error 3DS REQUEST', error);
        setStatusPay('Ошибка оплаты');
      });
  };
  const encryptData = async (
    data: string,
    publicKey: string,
    paymentId: number,
  ) => {
    // const keyPub = `-----BEGIN RSA PUBLIC KEY------/r/n${publicKey}/r/n-----END RSA PUBLIC KEY-----/r/n`;
    // RSA.generate()
    //   .then(() => {
    console.log('encryptData publiс_KEY====>', publicKey); // the public key
    try {
      RSA.encrypt(data, publicKey)
        .then(encodedMessage => {
          console.log(`THE ENCODED DATA!!! ${encodedMessage}`);
          setCardData(encodedMessage);
          console.log('cardData', encodedMessage);

          sha256(`${encodedMessage}${paymentId}${TerminalKey}`).then(hash => {
            setCheckTokenHash(hash);
            console.log('setCheckTokenHash::', hash);
            const data3DS: data3DSProp = {
              PaymentId: paymentId,
              TerminalKey: TerminalKey,
              CardData: encodedMessage,
              Token: hash,
            };
            request3DS(data3DS);
          });
        })
        // })
        .catch(e => console.log('err', e));
    } catch {
      setStatusPay('Ошибка оплаты');
    }
  };
  const Check3ds = async (paymentId: number) => {
    setStatusPay('3DS проверка...');
    const card = `PAN=${currCard?.number.replaceAll(
      ' ',
      '',
    )};ExpDate=${currCard?.dateEnd.replace('/', '')};CardHolder=${
      currCard?.name
    };CVV=${currCard?.cvv}`;

    console.log(card, '//CARD');
    console.log(cardData, '//card DATA crypt');
    // const data3DS: data3DSProp = {
    //   PaymentId: paymentId,
    //   TerminalKey: TerminalKey,
    //   CardData: cardData,
    //   Token: checkTokenHash,
    // };
    // console.log(data3DS, 'data3DS start');
    encryptData(card, OPEN_KEY, paymentId); //.finally(() => request3DS(data3DS));
  };

  const payInit = () => {
    setStatusPay('Инициализация платежа...');
    setloading(true);
    if (paymentId == 0) {
      const data = {
        TerminalKey: TerminalKey,
        Amount: priceInFormat,
        OrderId: orderId,
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
      const reqestInint = () => {
        console.log('reqestInint');
        const options = {
          method: 'POST',
          headers: headers,
          data: data,
          url: PAY_TINKOFF + INIT_PAY,
        };
        axios(options)
          .then(response => {
            console.log('INIT_PAY:', response.data);
            if (response.data?.Details && !response.data?.Success) {
              setStatusPay(response.data?.Details);
              setloading(false);
            }
            if (response.data?.PaymentId && response.data?.Success) {
              // setPaymentId();
              Check3ds(parseInt(response.data?.PaymentId));
            }
          })
          .catch(error => {
            console.log('error', error);
            setStatusPay('Ошибка инициализации платежа');
            setloading(false);
          });
      };

      const initKey = `${priceInFormat}Услуги доставки${orderId}${PasswordTerm}${TerminalKey}`;
      console.log(initKey, '//initKey');

      sha256(initKey)
        .then(hash => {
          setInitHashToken(hash);
          console.log('hash in payInit', hash);
        })
        .finally(() => reqestInint());
    } else {
      setStatusPay('Ошибка, попробуйте позже');
    }
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
  const [modalVisible, setModalVisible] = useState(false);

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
        <Space height={60} />
        {id_method === 2 && (
          <View>
            <CardModal
              addModalVisible={modalVisible}
              closeFunc={() => setModalVisible(false)}
            />
            {statusPay !== '' && (
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: colors.lavender,
                  height: 100,
                  width: 210,
                  borderRadius: 20,
                  paddingTop: 10,
                }}>
                <Body size={16} color="#fff" numberOfLines={2}>
                  {statusPay}
                </Body>
                <Space height={10} />
                <PointLoader load={loading} pointsCount={3} />
              </View>
            )}
          </View>
        )}
      </View>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          padding: 15,
        }}>
        {id_method === 2 && !currCard ? (
          <Button
            text={'Добавить карту'}
            onPress={() => setModalVisible(true)}
            buttonType={2}
          />
        ) : (
          <Button
            text={id_method === 3 ? 'ПРОВЕРИТЬ ОПЛАТУ' : 'ОПЛАТИТЬ'}
            onPress={pay}
            buttonType={2}
          />
        )}
      </View>
    </View>
  );
}
