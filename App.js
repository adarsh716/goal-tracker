import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

export default function Index() {
  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    if (goalText.trim()) {
      setGoals([{ id: Math.random().toString(), text: goalText }, ...goals]);
      setGoalText('');
    }
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const renderGoalItem = ({ item, index }) => (
    <View style={[styles.goalItem, { transform: [{ scale: 1 }] }]}>
      <View style={styles.goalNumber}>
        <Text style={styles.goalNumberText}>{index + 1}</Text>
      </View>
      <Text style={styles.goalText}>{item.text}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteGoal(item.id)}
        accessibilityLabel="Delete goal"
        accessibilityRole="button"
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEmoji}>🎯</Text>
          <Text style={styles.headerText}>Goal Tracker</Text>
          <Text style={styles.headerSubtext}>Turn dreams into achievements</Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="What's your next goal?"
              placeholderTextColor="#A0A0A0"
              value={goalText}
              onChangeText={setGoalText}
              accessibilityLabel="Goal input"
              returnKeyType="done"
              onSubmitEditing={handleAddGoal}
              multiline={true}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleAddGoal}
              accessibilityLabel="Submit goal"
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>✨ Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Goals Section */}
        <View style={styles.goalsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Goals</Text>
            {goals.length > 0 && (
              <View style={styles.goalCount}>
                <Text style={styles.goalCountText}>{goals.length}</Text>
              </View>
            )}
          </View>
          
          {goals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyTitle}>No goals yet!</Text>
              <Text style={styles.emptyText}>Start by adding your first goal above</Text>
            </View>
          ) : (
            <FlatList
              data={goals}
              renderItem={renderGoalItem}
              keyExtractor={(item) => item.id}
              style={styles.goalsList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.goalsListContent}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    backgroundColor: '#667eea',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerSubtext: {
    fontSize: 16,
    color: '#E8EAFF',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '400',
  },
  inputContainer: {
    padding: 24,
    paddingTop: 32,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 0,
    minHeight: 60,
    maxHeight: 120,
    borderBottomWidth: 2,
    borderBottomColor: '#F0F0F0',
    marginBottom: 20,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#667eea',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  goalsContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    letterSpacing: 0.3,
  },
  goalCount: {
    backgroundColor: '#667eea',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 32,
  },
  goalCountText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  goalsList: {
    flex: 1,
  },
  goalsListContent: {
    paddingBottom: 24,
  },
  goalItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  goalNumber: {
    backgroundColor: '#F0F3FF',
    borderRadius: 12,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },
  goalNumberText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '700',
  },
  goalText: {
    fontSize: 16,
    color: '#2D3748',
    lineHeight: 24,
    flex: 1,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    fontWeight: '400',
  },
});