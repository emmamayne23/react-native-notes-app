import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { getNotes, addNote, deleteNote, editNote } from "@/utils/noteService";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddNoteModal from "@/components/AddNoteModal";

type NotesArray = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function NotesScreen() {
  const [notes, setNotes] = useState<NotesArray[] | null>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [noteIdToEdit, setNoteIdToEdit] = useState<string | null>()

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const submitNote = async () => {
    if (!newTitle || !newContent) return;

    try {
      if(isEditing && noteIdToEdit) {
        await editNote(noteIdToEdit, newTitle, newContent)
      } else {
        await addNote(newTitle, newContent);
      }
      await fetchNotes(); // refresh notes list

      setNewTitle("");
      setNewContent("");
      setIsModalVisible(false); // close modal
      setIsEditing(false)
      setNoteIdToEdit(null)
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNote(id);
      await fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      {notes && notes.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>No notes yet</Text>
      ) : (
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onLongPress={() => handleDelete(item.id)}
              onPress={() => {
                setIsModalVisible(true);
                setNewTitle(item.title);
                setNewContent(item.content);
                setNoteIdToEdit(item.id);
                setIsEditing(true);
              }}
              >
              <View style={styles.noteContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
            </TouchableOpacity>
          )}
        />
      )}

      <View>
        {isModalVisible && (
          <AddNoteModal
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            submitNote={submitNote}
            newContent={newContent}
            setNewContent={setNewContent}
            isEditing={isEditing}
          />
        )}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        <AntDesign name="plus" size={36} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  mainContainer: {
    position: "relative",
    height: 680,
    // borderColor: "magenta",
    // borderWidth: 2
  },
  noteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#666",
  },
  addButton: {
    backgroundColor: "green",
    padding: 15,
    paddingHorizontal: 20,
    // width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
