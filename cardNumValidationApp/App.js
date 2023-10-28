import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, StyleSheet, Alert } from 'react-native';
import checkCardNum from 'cardnumvalidation';


export default function CreditCardNumValidator() {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleValidation = () => {
    setIsValid(null);

    const cardNumberWithoutSpaces = cardNumber.replace(/\s/g, '');

    if(cardNumberWithoutSpaces.length<16) {
      Alert.alert('Uyarı!', 'Kart numarası 16 karakterden az olamaz.')

    } else if (checkCardNum(cardNumberWithoutSpaces)) {
      setIsValid(true);

    } else {
      setIsValid(false);

    }
  };

  const handleClear = () => {
    //Girilen kart numarasını ve validasyon sonucunu temizle
    setCardNumber('');
    setIsValid(null);
  }
     
  const formatCardNumber = (text) => {
    // Sadece sayısal karakterleri kabul et
    const numericText = text.replace(/[^0-9]/g, '');

    const formattedText = numericText.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formattedText);
  };

  useEffect(() => {
    // Kart numarası girişi 16 karakter tamamlandığında 'Kartı Kontrol Et' tıklama işlevini çalıştır

    if(cardNumber.replace(/\s/g, '').length === 16){
      handleValidation();
    }

  }, [cardNumber]);

  return (
   
    <View style = {styles.container}>

      <View style = {styles.logoContainer}>
      <Image
      source={require('./assets/images/Albaraka_Logo.png')}
      style = {styles.logo}
      />
      </View>

      <View style = {styles.centered}>

      <Text style = {styles.label}>Kart Numarası Validasyonu Uygulamasına Hoş Geldiniz!</Text>

      <TextInput style = {styles.input}
        placeholder="Lütfen Kart Numaranızı Giriniz"
        onChangeText={(text) => formatCardNumber(text)}
        value={cardNumber.trim()}
        maxLength={19}
        keyboardType='numeric'
        textAlign='center'
      />

      <View style={styles.buttonContainer}>
      <Button title='Kartı Kontrol Et' onPress={handleValidation} color='darkorange'/>
      <View style={{ width: 10 }} />
      <Button title='Sil' onPress={handleClear}  color='darkorange'/>
      </View>

      {isValid !== null && (
        <Text style = {[styles.label, {color: isValid ? 'green':'red'}]}>
          Kart Numaranız {isValid ? 'geçerli' : 'geçersiz'}.
        </Text>
      )}

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 50,
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding:10,
    width: '80%,'
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  logo: {
    width: 300,
    height: 80,
    resizeMode: 'center',
    
  }
});
