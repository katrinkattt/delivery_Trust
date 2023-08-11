import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
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

export default function Agreement() {
  const navigation = useNavigation();

  const [agre, setAgre] = useState(false);

  const goToAgreement = () => {
    //agreement
  };

  return (
    <>
      <Header title="Соглашение" />

      <Body color="#243757" style={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Nunc leo morbi tortor leo nulla
        tellus in sed. Aenean nec morbi libero tincidunt tellus proin dignissim
        tincidunt.
      </Body>
      <Body color="#243757" style={styles.description}>
        Enim tincidunt hendrerit quam placerat adipiscing maecenas netus cursus
        velit. Id vehicula integer id diam ac hac nunc viverra. Lobortis risus
        ac integer pharetra eros volutpat risus massa. Dui porttitor semper
        ullamcorper eu adipiscing quisque. Justo tellus quam id faucibus et
        tellus mattis non.
      </Body>

      <Body color="#243757" style={styles.description}>
        Lorem ipsum dolor sit amet consectetur. Nunc leo morbi tortor leo nulla
        tellus in sed. Aenean nec morbi libero tincidunt tellus proin dignissim
        tincidunt. Enim tincidunt hendrerit quam placerat adipiscing maecenas
        netus cursus velit. Id vehicula integer id diam ac hac nunc viverra.
      </Body>

      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          padding: 15,
        }}>
        <CustomCheckbox
          label="Согласен/-(на) с условиями соглашения"
          style={{margin: 10}}
          onChange={() => setAgre(!agre)}
          val={agre}
          isGreen
        />
        <DropShadow style={styles.shadow}>
          <View style={{marginTop: 10, paddingHorizontal: 15}}>
            <Button
              onPress={() => agre && navigation.navigate('TabScreen')}
              buttonType={1}
              text="СОГЛАСИТЬСЯ И ОТПРАВАИТЬ"
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
    lineHeight: 24,
    marginBottom: 10,
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
