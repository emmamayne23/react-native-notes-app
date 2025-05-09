import React from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface AddNoteModalProps {
    setIsModalVisible: (visible: boolean) => void,
    newTitle: string,
    setNewTitle: (note: string) => void,
    newContent: string,
    setNewContent: (content: string) => void
    isModalVisible: boolean,
    submitNote: () => void,
    isEditing: boolean
}

export default function AddNoteModal({ setIsModalVisible, newTitle, setNewTitle, newContent, setNewContent, isModalVisible, submitNote, isEditing }: AddNoteModalProps) {
  return (
    <View>
      <Modal 
            animationType="slide"
            transparent
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
            >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{isEditing ? "Edit Note" : "Add a New Note"}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter title ..."
                  placeholderTextColor={"#aaa"}
                  value={newTitle}
                  onChangeText={setNewTitle}
                />

                <TextInput 
                style={styles.input}
                  placeholder="Content here ..."
                  placeholderTextColor={"#aaa"}
                  value={newContent}
                  onChangeText={setNewContent}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={submitNote}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
     </View>
  );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalContent: {
        backgroundColor: "#ffff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
      },
      modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
      },
      input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
      },
      modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
      },
      cancelButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
        marginRight: 10,
      },
      saveButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: "center",
      },
      cancelButtonText: {
        fontSize: 16,
        color: "#333",
      },
      saveButtonText: {
        fontSize: 16,
        color: "#fff",
      },
})
