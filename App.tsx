import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';

const App: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const formatPhoneNumber = (number: string): string => {
    // First, remove ALL non-digit characters including +, spaces, dashes, parentheses, etc.
    let cleanNumber = number.replace(/[^0-9]/g, '');
    
    // Double check: remove any remaining + signs (shouldn't be any, but just to be sure)
    cleanNumber = cleanNumber.replace(/\+/g, '');
    
    // Remove leading zeros to prevent WhatsApp from adding + sign
    cleanNumber = cleanNumber.replace(/^0+/, '');
    
    // If the number is empty after removing zeros, return the original
    if (cleanNumber === '') {
      cleanNumber = number.replace(/[^0-9]/g, '');
    }
    
    return cleanNumber;
  };

  const handlePhoneNumberChange = (text: string): void => {
    // Remove any + signs immediately when user types
    const cleanText = text.replace(/\+/g, '');
    setPhoneNumber(cleanText);
  };

  const openWhatsApp = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    let formattedNumber = formatPhoneNumber(phoneNumber);
    
    console.log('Original input:', phoneNumber);
    console.log('Formatted number:', formattedNumber);

    if (formattedNumber.length < 7 || formattedNumber === '' || formattedNumber === '0') {
      Alert.alert('Error', 'Please enter a valid phone number with country code');
      return;
    }

    // Try multiple WhatsApp URL formats - using the clean number without + sign
    const whatsappUrls = [
      `whatsapp://send?phone=${formattedNumber}`,
      `https://wa.me/${formattedNumber}`,
      `https://api.whatsapp.com/send?phone=${formattedNumber}`,
    ];

    console.log('WhatsApp URLs:', whatsappUrls);

    let opened = false;

    // Try each URL format
    for (const url of whatsappUrls) {
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
          opened = true;
          break;
        }
      } catch (error) {
        console.log(`Failed to open ${url}:`, error);
      }
    }

    // If none worked, try to open directly without checking
    if (!opened) {
      try {
        await Linking.openURL(`whatsapp://send?phone=${formattedNumber}`);
        opened = true;
      } catch (error) {
        console.log('Direct WhatsApp URL failed:', error);
      }
    }

    // If still not opened, show options
    if (!opened) {
      Alert.alert(
        'Open WhatsApp',
        'Choose how to open WhatsApp chat:',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Open in Browser',
            onPress: () => {
              const webUrl = `https://wa.me/${formattedNumber}`;
              Linking.openURL(webUrl);
            },
          },
          {
            text: 'Try WhatsApp App',
            onPress: () => {
              Linking.openURL(`whatsapp://send?phone=${formattedNumber}`)
                .catch(() => {
                  const storeUrl = Platform.OS === 'ios'
                    ? 'https://apps.apple.com/app/whatsapp-messenger/id310633997'
                    : 'https://play.google.com/store/apps/details?id=com.whatsapp';
                  Linking.openURL(storeUrl);
                });
            },
          },
        ]
      );
    }
  };

  const clearInput = () => {
    setPhoneNumber('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Open Chat</Text>
          <Text style={styles.subtitle}>
            Start a WhatsApp chat without saving the contact
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="Enter phone number (e.g., 923422381860, 441234567890)"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={20}
          />
          <Text style={styles.hint}>
            Enter full number with country code (92 for Pakistan, 1 for US, 44 for UK)
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={openWhatsApp}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Open in WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={clearInput}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            • Enter any international phone number with country code{'\n'}• Tap "Open in
            WhatsApp" to start chatting{'\n'}• No need to save the contact to
            your phone{'\n'}• Works with any valid WhatsApp number worldwide
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#25D366',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  hint: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
    fontStyle: 'italic',
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#25D366',
    shadowColor: '#25D366',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#F0F8F0',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#25D366',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default App;
