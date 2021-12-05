import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import axios from 'axios';
import { Button, Icon } from "react-native-elements";
import { Colors, Endpoints } from "../constants";

const OtpView = ({ route }) => {
  const navigation = useNavigation();
  const input1 = useRef();
  const input2 = useRef();
  const input3 = useRef();
  const input4 = useRef();
  const input5 = useRef();
  const input6 = useRef();
  const [otp, setOpt] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });
  const [isLoading, setIsLoading] = useState(false);

  // const onNext = () => navigation.navigate("Register", { email: route.params.email });

  const body = {
    code: otp[1] + otp[2] + otp[3] + otp[4] + otp[5] + otp[6],
    email: route.params.email
  }

  const otpVerify = async () => {
    setIsLoading(true);
    await axios.post(Endpoints.CHECK_OTP, body)
      .then((res) => {
        setIsLoading(false);
        navigation.navigate("Register", { email: route.params.email });
      })
      .catch((err) => setIsLoading(false))
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" translucent />
      <View style={styles.content}>
        {/* <Text style={styles.title}>Enter confirmation code</Text> */}
        <Text style={styles.subTitle}>
          Enter the confirmation code we sent to {route.params.email}
        </Text>
        <Button
          icon={
            <Icon
              name="refresh-circle"
              type="ionicon"
              size={20}
              color={Colors.DEFAULT_BLUE}
            />
          }
          type="clear"
          title="Resend confirmation code"
        />
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpIntput}
              ref={input1}
              onChangeText={(text) => {
                setOpt({ ...otp, 1: text });
                text && input2.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpIntput}
              ref={input2}
              onChangeText={(text) => {
                setOpt({ ...otp, 2: text });
                text ? input3.current.focus() : input1.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpIntput}
              ref={input3}
              onChangeText={(text) => {
                setOpt({ ...otp, 3: text });
                text ? input4.current.focus() : input2.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpIntput}
              ref={input4}
              onChangeText={(text) => {
                setOpt({ ...otp, 4: text });
                text ? input5.current.focus() : input3.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpIntput}
              ref={input5}
              onChangeText={(text) => {
                setOpt({ ...otp, 5: text });
                text ? input6.current.focus() : input4.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              keyboardType="number-pad"
              maxLength={1}
              style={styles.otpIntput}
              ref={input6}
              onChangeText={(text) => {
                setOpt({ ...otp, 6: text });
                !text && input5.current.focus();
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Button onPress={otpVerify} loading={isLoading ? true : false} type="solid" title="Next" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OtpView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    paddingBottom: 10,
  },
  content: {
    top: 20,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    color: Colors.BLACK,
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    color: Colors.BLACK,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  linkText: {
    color: Colors.DEFAULT_BLUE,
    fontSize: 16,
    fontWeight: "700",
  },
  otpContainer: {
    marginTop: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    backgroundColor: Colors.INPUT_BACKGROUND,
    maxWidth: 50,
    minWidth: 50,
  },
  otpIntput: {
    fontSize: 25,
    textAlign: "center",
    padding: 15,
  },
});
