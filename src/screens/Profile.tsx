import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters/extend';
import TabViewExample from '../components/TabView';
import Header from '../components/Header';
import Body from '../components/common/Body';
import {useDispatch, useSelector} from 'react-redux';
import {loadCards} from '../state/user/slice';

export default function Profile() {
  const [text, setText] = useState<string>('');
  const [index, setIndex] = useState(0);
  const user = useSelector(state => state.user);
  const routes = [
    {key: 'Setting', title: 'Настройки'},
    {key: 'Data', title: 'Личные данные'},
    {key: 'Parol', title: 'Пароль'},
  ];

  return (
    <>
      <View style={[styles.container, index !== 1 && {marginBottom: -30}]}>
        {index === 1 ? (
          <Header title={user?.email} />
        ) : (
          <Header title={routes[index]?.title} />
        )}
        {index === 1 ? (
          <View style={styles.dataHeader}>
            <Body size={12}>Проверен</Body>
          </View>
        ) : null}
      </View>
      <TabViewExample routes={routes} setIndex={setIndex} index={index} />
    </>
  );
}

const styles = ScaledSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  dataHeader: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: '#D1EA7A',
    borderRadius: 3,
    lineHeight: 14,
  },
});
