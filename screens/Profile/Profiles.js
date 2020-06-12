/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Linking, Platform} from 'react-native';
import {Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import DialogInput from 'react-native-dialog-input';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const Profiles = ({route, navigation}) => {
  const {rollnum} = route.params;
  const {name} = route.params;
  const {email} = route.params;
  const {phone} = route.params;
  const {_id} = route.params;
  const {password} = route.params;
  const [delKey, setDelKey] = useState('');
  // this.isDialogVisible = this.isDialogVisible.bind(this);

  useEffect(() => {
    console.log(rollnum);
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(_id);
  });

  const openDial = () => {
    if (Platform.os === 'android') {
      Linking.openURL('tel:{{phone}}');
    } else {
      Linking.openURL('tel:{{phone}}');
    }
    // Linking.openDial('tel:12345');
  };

  const deleteAcc = () => {
    fetch('http://97eff9bce2a3.ngrok.io/delete/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('deleted', data);
      });
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={['#001eff', '#727ab0']} style={{height: '20%'}} />

      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 150, height: 150, borderRadius: 75, marginTop: -50}}
          source={{
            uri:
              'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',
          }}
        />
      </View>
      <View style={{alignItems: 'center', margin: 5}}>
        <Title>{name}</Title>
        <Text style={{fontSize: 20}}>{rollnum}</Text>
      </View>
      <Card
        style={styles.myCard}
        onPress={() => {
          Linking.openURL('mailto: sesha@gmail.com');
        }}>
        <View style={styles.cardContent} />
        <Icon.Button name="facebook" backgroundColor="grey">
          <Text style={styles.myText}>{email}</Text>
        </Icon.Button>
      </Card>
      <Card style={styles.myCard} onPress={() => openDial()}>
        <View style={styles.cardContent} />
        <Icon.Button name="phone" backgroundColor="grey">
          <Text style={styles.myText}>{phone}</Text>
        </Icon.Button>
      </Card>
      <Card style={styles.myCard}>
        <View style={styles.cardContent} />
        <Icon.Button name="money" backgroundColor="grey">
          <Text style={styles.myText}>10 LPA</Text>
        </Icon.Button>
      </Card>
      <View style={styles.alignButton}>
        <Button
          icon="account-edit"
          mode="contained"
          onPress={() =>
            navigation.navigate('Signup', {
              rollnum,
              name,
              email,
              phone,
              _id,
              password,
            })
          }>
          Edit account
        </Button>
        <Button
          icon="delete-circle"
          mode="contained"
          theme={theme}
          onPress={() => deleteAcc()}>
          Delete account
        </Button>
      </View>
    </View>
  );
};
const theme = {
  color: {
    primary: 'red',
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  myCard: {
    margin: 3,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 8,
  },
  myText: {
    fontSize: 20,
    marginBottom: 2,
  },
  alignButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 6,
  },
});
export default Profiles;
