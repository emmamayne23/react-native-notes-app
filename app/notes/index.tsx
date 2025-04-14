import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { addNote, getNotes } from "@/utils/noteService";
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
  const [newNote, setNewNote] = useState<string>("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const submitNote = () => {}

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />

      <View>
        {isModalVisible && (
          <AddNoteModal
            isModalVisible={isModalVisible}
             setIsModalVisible={setIsModalVisible}
              newNote={newNote}
               setNewNote={setNewNote}
                submitNote={submitNote} />
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
