import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function VegFilterScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterOptions = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'veg', label: 'Vegetarian Only', icon: '🥬' },
    { id: 'non-veg', label: 'Non-Vegetarian', icon: '🍗' },
  ];

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter by Category</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Options */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Select your preference</Text>
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.filterOption, selectedFilter === option.id && styles.filterOptionActive]}
              onPress={() => handleFilterSelect(option.id)}
            >
              <Text style={styles.filterIcon}>{option.icon}</Text>
              <Text style={[styles.filterLabel, selectedFilter === option.id && styles.filterLabelActive]}>
                {option.label}
              </Text>
              {selectedFilter === option.id && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>About Filters</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>All:</Text> Shows both vegetarian and non-vegetarian options
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Vegetarian:</Text> Shows only vegetarian items
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Non-Vegetarian:</Text> Shows non-vegetarian options
          </Text>
        </View>

        {/* Apply Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => router.back()}
          >
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    backgroundColor: '#FF6B35',
    borderBottomWidth: 1,
    borderBottomColor: '#FF8559',
  },
  backButton: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  filterOptionActive: {
    backgroundColor: '#FFF3EE',
    borderColor: '#FF6B35',
  },
  filterIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  filterLabelActive: {
    color: '#FF6B35',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFF3EE',
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  infoBold: {
    fontWeight: '600',
    color: '#1A1A1A',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  applyButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
