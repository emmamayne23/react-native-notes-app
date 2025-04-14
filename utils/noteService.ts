import { supabase } from "../lib/supabase"

type NotesArray = {
    id: string,
    title: string,
    content: string,
    created_at: string,
    updated_at: string
}

// get all notes
export const getNotes: () => Promise<NotesArray[] | null> =  async () => {
    const { data, error } = await supabase.from("notes").select("*").order("created_at", { ascending: false })
    if(error) {
        console.error("Could not fetch notes", error)
    }
    return data
}

// create note
export const addNote = async (title: string, content: string) => {
    const { data, error } = await supabase.from("notes").insert([{ title, content }])

    if(error) {
        console.error("Could not add note", error)
    }
    return data
}

// editing a note
export const editNote = async (id: string, title: string, content: string) => {
    const { data, error } = await supabase.from("notes").update([{ title, content }]).eq("id", id)

    if(error) {
        console.error("Could not edit note", error)
    }
    return data
}

// deleting a note
export const deleteNote = async (id: string) => {
    const { data, error } = await supabase.from("notes").delete().eq("id", id)
    if (error) throw error
    return data
}