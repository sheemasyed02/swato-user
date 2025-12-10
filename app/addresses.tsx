import { useUser } from '@/contexts/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddressesScreen() {
  const router = useRouter();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUser();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  const [addressType, setAddressType] = useState('');
  const [address, setAddress] = useState('');
  const [details, setDetails] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddressType('');
    setAddress('');
    setDetails('');
    setIsDefault(false);
    setModalVisible(true);
  };

  const handleEditAddress = (addr: any) => {
    setEditingAddress(addr.id);
    setAddressType(addr.type);
    setAddress(addr.address);
    setDetails(addr.details);
    setIsDefault(addr.isDefault);
    setModalVisible(true);
  };

  const handleSaveAddress = () => {
    if (!addressType.trim() || !address.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (editingAddress) {
      updateAddress(editingAddress, {
        type: addressType.trim(),
        address: address.trim(),
        details: details.trim(),
        isDefault
      });
    } else {
      addAddress({
        type: addressType.trim(),
        address: address.trim(),
        details: details.trim(),
        isDefault
      });
    }
    
    setModalVisible(false);
  };

  const handleDeleteAddress = (id: number) => {
    Alert.alert(
      'Delete Address',
      'Are you sure you want to delete this address?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteAddress(id)
        }
      ]
    );
  };

  const handleSetDefault = (id: number) => {
    setDefaultAddress(id);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Addresses</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {addresses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="location-outline" size={80} color="#CCCCCC" />
            <Text style={styles.emptyText}>No addresses saved</Text>
            <Text style={styles.emptySubtext}>Add your delivery addresses</Text>
          </View>
        ) : (
          addresses.map((addr) => (
            <View key={addr.id} style={styles.addressCard}>
              <View style={styles.addressHeader}>
                <View style={styles.typeIcon}>
                  <Ionicons 
                    name={addr.type === 'Home' ? 'home' : addr.type === 'Work' ? 'briefcase' : 'location'} 
                    size={20} 
                    color="#FF6B35" 
                  />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressType}>{addr.type}</Text>
                  {addr.isDefault && (
                    <View style={styles.defaultBadge}>
                      <Ionicons name="checkmark-circle" size={14} color="#10B981" />
                      <Text style={styles.defaultText}>Default</Text>
                    </View>
                  )}
                </View>
              </View>
              <Text style={styles.addressText}>{addr.address}</Text>
              {addr.details && <Text style={styles.addressDetails}>{addr.details}</Text>}
              <View style={styles.addressActions}>
                {!addr.isDefault && (
                  <TouchableOpacity 
                    style={styles.setDefaultButton}
                    onPress={() => handleSetDefault(addr.id)}
                  >
                    <Text style={styles.setDefaultText}>Set as Default</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditAddress(addr)}
                >
                  <Ionicons name="pencil" size={16} color="#FF6B35" />
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteAddress(addr.id)}
                >
                  <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
          <Ionicons name="add-circle" size={24} color="#FF6B35" />
          <Text style={styles.addButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add/Edit Address Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Address Type *</Text>
                <View style={styles.typeSelector}>
                  {['Home', 'Work', 'Other'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeButton,
                        addressType === type && styles.typeButtonActive
                      ]}
                      onPress={() => setAddressType(type)}
                    >
                      <Text style={[
                        styles.typeButtonText,
                        addressType === type && styles.typeButtonTextActive
                      ]}>
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Complete Address *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your full address"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Landmark / Additional Details</Text>
                <TextInput
                  style={styles.input}
                  value={details}
                  onChangeText={setDetails}
                  placeholder="E.g., Near Central Park, Building 5"
                  placeholderTextColor="#999"
                />
              </View>

              <TouchableOpacity
                style={styles.defaultCheckbox}
                onPress={() => setIsDefault(!isDefault)}
              >
                <View style={[styles.checkbox, isDefault && styles.checkboxChecked]}>
                  {isDefault && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
                <Text style={styles.checkboxLabel}>Set as default address</Text>
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveAddress}
              >
                <Text style={styles.saveButtonText}>
                  {editingAddress ? 'Update' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
    paddingBottom: 16,
    backgroundColor: '#FF6B35',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    paddingTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIconText: {
    fontSize: 20,
  },
  addressInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  addressType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  defaultBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  defaultText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#10B981',
  },
  addressText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
    marginBottom: 6,
  },
  addressDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
  },
  addressActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  setDefaultButton: {
    flex: 1,
    backgroundColor: '#D1FAE5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: '100%',
    marginBottom: 8,
  },
  setDefaultText: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '600',
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF3EE',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  editButtonText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  deleteButtonText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderStyle: 'dashed',
    marginBottom: 24,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  modalBody: {
    padding: 20,
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  typeButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  typeButtonTextActive: {
    color: '#FFFFFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A1A',
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  defaultCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#666',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
