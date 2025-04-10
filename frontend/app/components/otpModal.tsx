import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TextInput as RNTextInput,
} from 'react-native';

interface OtpModalProps {
  visible: boolean;
  onClose: () => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ visible, onClose }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(false);

  const inputRefs = useRef<Array<RNTextInput | null>>([]);

  useEffect(() => {
    if (visible) {
      resetOtp();
    }
  }, [visible]);

  useEffect(() => {
    if (visible && timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [visible, timer]);

  useEffect(() => {
    const filled = otp.every((digit) => digit !== '');
    if (filled) {
      autoSubmitOtp();
    }
  }, [otp]);

  const resetOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setLoading(false);
    inputRefs.current[0]?.focus();
  };

  const handleOtpChange = (text: string, index: number) => {
    if (text.length > 1) {
      const otpArray = text.slice(0, 6).split('');
      setOtp(otpArray);
      inputRefs.current[Math.min(otpArray.length - 1, 5)]?.focus();
    } else {
      const updatedOtp = [...otp];
      updatedOtp[index] = text;
      setOtp(updatedOtp);

      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const autoSubmitOtp = () => {
    if (loading) return;
    setLoading(true);

    const enteredOtp = otp.join('');

    // Simulated validation
    setTimeout(() => {
      setLoading(false);

      if (enteredOtp === '123456') {
        Alert.alert('Success', 'OTP Verified!');
        onClose();
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
        resetOtp();
      }
    }, 1500);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black bg-opacity-70 justify-center items-center px-6">
        <View className="bg-[#1F1F1F] w-full p-6 rounded-lg">
          <Text className="text-white text-lg font-bold mb-2">MOBILE VERIFICATION</Text>
          <Text className="text-gray-400 mb-4">A 6 digit OTP is sent to your mobile number</Text>

          <View className="flex-row justify-between mb-4">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                maxLength={1}
                keyboardType="number-pad"
                style={styles.otpBox}
                value={digit}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity
            disabled={timer > 0}
            onPress={() => setTimer(30)}
            className={`border py-2 rounded mb-4 ${timer > 0 ? 'border-gray-700' : 'border-white'}`}
          >
            <Text className="text-white text-center">
              {timer > 0 ? `RESEND OTP IN ${timer} SECS` : 'RESEND OTP'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onClose}
            className="border border-red-500 py-2 rounded"
          >
            <Text className="text-red-500 text-center">CLOSE</Text>
          </TouchableOpacity>
        </View>

        {/* Spinner modal */}
        {loading && (
          <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-60">
            <ActivityIndicator size="large" color="#FFFFFF" />
            <Text className="text-white mt-4">Verifying OTP...</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  otpBox: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: '#4B5563',
    color: '#FFFFFF',
    textAlign: 'center',
    borderRadius: 6,
    fontSize: 18,
  },
});

export default OtpModal;
