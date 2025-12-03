import React, { useState } from 'react';
	import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
	
	const API_URL = 'https://the-sovereign-code.vercel.app/api/chat';
	
	export default function App() {
	  const [input, setInput] = useState('');
	  const [response, setResponse] = useState('');
	  const [loading, setLoading] = useState(false);
	
	  const handleSend = async () => {
	    if (!input.trim()) return;
	
	    setLoading(true);
	    setResponse('');
	
	    try {
	      const res = await fetch(API_URL, {
	        method: 'POST',
	        headers: { 'Content-Type': 'application/json' },
	        body: JSON.stringify({ message: input }),
	      });
	
	      const data = await res.json();
	      setResponse(data.reply);
	    } catch (error) {
	      setResponse('The Citadel is unreachable. Check your connection.');
	    } finally {
	      setLoading(false);
	    }
	  };
	
	  return (
	    <SafeAreaView style={styles.container}>
	      <StatusBar barStyle="light-content" />
	
	      <View style={styles.header}>
	        <Text style={styles.title}>THE SOVEREIGN</Text>
	        <Text style={styles.subtitle}>Architect Your Reality</Text>
	      </View>
	
	      <View style={styles.responseContainer}>
	        {loading ? (
	          <ActivityIndicator size="large" color="#D4AF37" />
	        ) : (
	          <Text style={styles.responseText}>{response || "Awaiting Command..."}</Text>
	        )}
	      </View>
	
	      <View style={styles.inputContainer}>
	        <TextInput
	          style={styles.input}
	          placeholder="State your situation..."
	          placeholderTextColor="#666"
	          value={input}
	          onChangeText={setInput}
	          multiline
	        />
	        <TouchableOpacity style={styles.button} onPress={handleSend}>
	          <Text style={styles.buttonText}>EXECUTE</Text>
	        </TouchableOpacity>
	      </View>
	    </SafeAreaView>
	  );
	}
	
	const styles = StyleSheet.create({
	  container: {
	    flex: 1,
	    backgroundColor: '#000000',
	  },
	  header: {
	    padding: 20,
	    alignItems: 'center',
	    borderBottomWidth: 1,
	    borderBottomColor: '#333',
	  },
	  title: {
	    fontSize: 24,
	    fontWeight: 'bold',
	    color: '#D4AF37', // Gold
	    letterSpacing: 2,
	  },
	  subtitle: {
	    fontSize: 12,
	    color: '#888',
	    marginTop: 5,
	    textTransform: 'uppercase',
	  },
	  responseContainer: {
	    flex: 1,
	    padding: 20,
	    justifyContent: 'center',
	  },
	  responseText: {
	    fontSize: 18,
	    color: '#FFF',
	    lineHeight: 28,
	    textAlign: 'left',
	  },
	  inputContainer: {
	    padding: 20,
	    borderTopWidth: 1,
	    borderTopColor: '#333',
	  },
	  input: {
	    backgroundColor: '#111',
	    color: '#FFF',
	    padding: 15,
	    borderRadius: 10,
	    fontSize: 16,
	    minHeight: 60,
	    marginBottom: 15,
	    borderWidth: 1,
	    borderColor: '#333',
	  },
	  button: {
	    backgroundColor: '#D4AF37',
	    padding: 15,
	    borderRadius: 10,
	    alignItems: 'center',
	  },
	  buttonText: {
	    color: '#000',
	    fontWeight: 'bold',
	    fontSize: 16,
	    letterSpacing: 1,
	  },
	});
	