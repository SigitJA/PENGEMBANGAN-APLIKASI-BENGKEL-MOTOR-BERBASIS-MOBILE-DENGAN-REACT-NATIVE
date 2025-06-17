import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [userName, setUserName] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('Error', 'Silakan isi email dan password.');
      return;
    }

    if (loginEmail !== regEmail || loginPassword !== regPassword) {
      Alert.alert('Login Gagal', 'Email atau Password salah, atau belum terdaftar.');
      return;
    }

    setUserName(regName);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    setLoginEmail('');
    setLoginPassword('');
  };

  const handleRegister = () => {
    if (!regName || !regEmail || !regPassword) {
      Alert.alert('Error', 'Silakan isi semua kolom.');
      return;
    }

    setUserName(regName);
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    setLoginEmail(regEmail);
    setLoginPassword(regPassword);
    Alert.alert("Registrasi Berhasil", "Silakan login menggunakan email & password yang didaftarkan.");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginEmail('');
    setLoginPassword('');
    setUserName('');
    setCurrentScreen('dashboard');
  };

  const DashboardView = () => (
    <View style={styles.dashboardContainer}>
      <Text style={styles.dashboardTitle}>Halo, {userName}!</Text>
      <Text style={styles.dashboardSubtitle}>Selamat datang di Aplikasi Bengkel Motor</Text>

      <TouchableOpacity style={styles.featureButton} onPress={() => setCurrentScreen('booking')}>
        <Text style={styles.featureText}>Booking Servis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => setCurrentScreen('status')}>
        <Text style={styles.featureText}>Cek Status Servis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => setCurrentScreen('history')}>
        <Text style={styles.featureText}>Fasilitas Bengkel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.featureButton} onPress={() => setCurrentScreen('contact')}>
        <Text style={styles.featureText}>Hubungi Bengkel</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.featureButton, { backgroundColor: '#FF3B30' }]} onPress={handleLogout}>
        <Text style={styles.featureText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

  const BookingView = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.pageTitle}>Booking Servis</Text>
      <Text style={styles.pageText}>Silakan pilih tanggal dan jenis servis Anda.</Text>
      <Text style={styles.pageText}>- Ganti Oli</Text>
      <Text style={styles.pageText}>- Servis Rutin</Text>
      <Text style={styles.pageText}>- Ganti Kampas Rem</Text>
    </View>
  );

  const StatusView = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.pageTitle}>Status Servis</Text>
      <Text style={styles.pageText}>Servis Anda saat ini: Sedang Dikerjakan - Estimasi selesai 1 jam lagi.</Text>
    </View>
  );

  const HistoryView = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.pageTitle}>Fasilitas Bengkel</Text>
      <ScrollView>
        <Text style={styles.pageText}>✔ Teknisi berpengalaman</Text>
        <Text style={styles.pageText}>✔ Ruang tunggu nyaman</Text>
        <Text style={styles.pageText}>✔ Layanan cepat & ramah</Text>
        <Text style={styles.pageText}>✔ Sparepart original</Text>
        <Text style={styles.pageText}>✔ Booking online 24 jam</Text>
      </ScrollView>
    </View>
  );

  const ContactView = () => (
    <View style={styles.screenContainer}>
      <Text style={styles.pageTitle}>Hubungi Bengkel</Text>
      <Text style={styles.pageText}>Nama Bengkel: SigitMotorcycle</Text>
      <Text style={styles.pageText}>Telepon: 085759425334</Text>
      <Text style={styles.pageText}>Alamat: Jl. Pasir Jati, Subang</Text>
    </View>
  );

  const renderDashboardContent = () => {
    switch (currentScreen) {
      case 'booking': return <BookingView />;
      case 'status': return <StatusView />;
      case 'history': return <HistoryView />;
      case 'contact': return <ContactView />;
      default: return <DashboardView />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.keyboardAvoidingView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            {isLoggedIn ? (
              <>
                {renderDashboardContent()}
                {currentScreen !== 'dashboard' && (
                  <TouchableOpacity style={[styles.featureButton, { marginTop: 16 }]} onPress={() => setCurrentScreen('dashboard')}>
                    <Text style={styles.featureText}>Kembali ke Dashboard</Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <>
                <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
                {isLogin ? (
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      keyboardType="email-address"
                      value={loginEmail}
                      onChangeText={setLoginEmail}
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry
                      value={loginPassword}
                      onChangeText={setLoginPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                      <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.form}>
                    <TextInput
                      style={styles.input}
                      placeholder="Nama"
                      value={regName}
                      onChangeText={setRegName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      keyboardType="email-address"
                      value={regEmail}
                      onChangeText={setRegEmail}
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry
                      value={regPassword}
                      onChangeText={setRegPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                      <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
                )}
                <TouchableOpacity
                  onPress={() => setIsLogin(!isLogin)}
                  style={styles.switchContainer}
                >
                  <Text style={styles.switchText}>
                    {isLogin ? "Belum punya akun? Register" : "Sudah punya akun? Login"}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  keyboardAvoidingView: { flex: 1 },
  innerContainer: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24, textAlign: 'center' },
  form: { marginBottom: 24 },
  input: {
    height: 48, borderColor: '#ccc', borderWidth: 1,
    borderRadius: 6, marginBottom: 12, paddingHorizontal: 12,
    fontSize: 16, backgroundColor: '#f9f9f9'
  },
  button: {
    height: 48, backgroundColor: '#007AFF', borderRadius: 6,
    justifyContent: 'center', alignItems: 'center', marginTop: 8
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  switchContainer: { alignItems: 'center', marginTop: 12 },
  switchText: { color: '#007AFF', fontSize: 15 },
  dashboardContainer: {
    alignItems: 'center', justifyContent: 'center', flex: 1, paddingHorizontal: 24,
  },
  dashboardTitle: { fontSize: 26, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  dashboardSubtitle: { fontSize: 16, color: '#555', marginBottom: 24, textAlign: 'center' },
  featureButton: {
    backgroundColor: '#007AFF', paddingVertical: 14, paddingHorizontal: 24,
    borderRadius: 8, marginBottom: 12, alignItems: 'center', width: '100%'
  },
  featureText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  screenContainer: { flex: 1, justifyContent: 'flex-start', paddingTop: 60, paddingHorizontal: 24 },
  pageTitle: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  pageText: { fontSize: 16, marginBottom: 12, lineHeight: 22 },
});
