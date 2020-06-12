import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {PERMISSIONS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './SignupStyles';

const Signup = ({navigation: {navigate}, route}) => {
  const getDetails = type => {
    if (route.params) {
      const {_id} = route.params._id;
      const {rollnum} = route.params.rollnum;
      switch (type) {
        case 'name':
          return route.params.name;
        case 'email':
          return route.params.email;
        case 'phone':
          return route.params.phone;
        case 'password':
          return route.params.password;
        case 'rollnum':
          return route.params.rollnum;
      }
    }
    return '';
  };

  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [email, setEmail] = useState(getDetails('email'));
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState(getDetails('password'));
  const [rollnum, setRollnum] = useState(getDetails('rollnum'));
  const [modal, setModal] = useState(false);
  const [value, onChangeText] = React.useState('Useless Placeholde');

  const submitData = () => {
    fetch('http://97eff9bce2a3.ngrok.io/send-data/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        rollnum,
        salary,
        password,
        phone,
      }),
    })
      .then(res => JSON.parse(res))
      .then(data => {
        console.log('data', data);
        Alert.alert('saved');
        // navigate('LoggedOff');
      });
  };

  const updateDetails = () => {
    fetch('http://97eff9bce2a3.ngrok.io/update/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: route.params._id,
        name,
        email,
        phone,
        picture,
        rollnum: route.params.rollnum,
        password: route.params.password,
      }),
    })
      .then(res => JSON.parse(res))
      .then(data => {
        console.log('updated data', data);
        Alert.alert('updated');
        // navigate('LoggedOff');
      });
  };

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView>
        <TextInput
          label="Name"
          style={styles.inputStyle}
          value={name}
          theme={theme}
          mode="outlined"
          onChangeText={text => setName(text)}
        />
        <TextInput
          label="Email"
          style={styles.inputStyle}
          value={email}
          theme={theme}
          mode="outlined"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Phone"
          style={styles.inputStyle}
          value={phone}
          theme={theme}
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          label="Roll Number"
          style={styles.inputStyle}
          value={rollnum}
          theme={theme}
          mode="outlined"
          onChangeText={text => setRollnum(text)}
        />
        <TextInput
          label="Password"
          style={styles.inputStyle}
          value={password}
          theme={theme}
          mode="outlined"
          onChangeText={text => setPassword(text)}
        />
        <Button mode="contained" onPress={() => setModal(true)}>
          Upload image
        </Button>
        {route.params ? (
          <Button
            style={{marginTop: 10}}
            mode="contained"
            onPress={() => {
              updateDetails();
              Alert.alert(
                ' ',
                'Account Saved',
                [{text: 'OK', onPress: () => navigate('Profiles')}],
                {cancelable: false},
              );
            }}>
            Update
          </Button>
        ) : (
          <Button
            style={{marginTop: 10}}
            mode="contained"
            onPress={() => {
              submitData();
              Alert.alert(
                ' ',
                'Account Saved',
                [{text: 'OK', onPress: () => navigate('LoggedOff')}],
                {cancelable: false},
              );
            }}>
            Save
          </Button>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(false)}>
          <View style={styles.modalView}>
            <View style={styles.ModalButtonView}>
              <Button
                theme={theme}
                mode="contained"
                onPress={() => takeImage()}>
                Camera
              </Button>

              <Button
                theme={theme}
                mode="contained"
                onPress={() => chooseImage()}>
                Gallery
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              Cancel
            </Button>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
};

const theme = {
  colors: {
    primary: 'violet',
  },
};
const takeImage = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    let newfile = {
      uri: image.path,
      type: `test/${image.path.split('.')[1]}`,
      name: `test.${image.path.split('.')[1]}`,
    };
    handleupload(newfile);
    console.log(image);
  });
};

const chooseImage = () => {
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true,
  }).then(image => {
    let newfile = {
      uri: image.path,
      type: `test/${image.path.split('.')[1]}`,
      name: `test.${image.path.split('.')[1]}`,
    };
    handleupload(newfile);
    console.log(image);
  });
};
const handleupload = image => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'velammal');
  data.append('cloud_name', 'seshacloud');
  fetch('https://api.cloudinary.com/v1_1/seshacloud/image/upload', {
    method: 'post',
    body: image,
  })
    .then(res => res.json())
    .then(console.log(data));
};
export default Signup;
