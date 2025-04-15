import { supabase } from "@/lib/supabase";

export const signUp = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signUp({ email, password })
    if (error) {
        console.error("Sign Up error: ", error)

        throw error
    }

    return user
}

export const signIn = async (email: string, password: string) => {
    const { user, error } = await supabase.auth.signIn({ email, password })
    if (error) {
        console.error("Sign In error: ", error)

        throw error
    }

    return user
}

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error("Sign Out error: ", error)

        throw error
    }
}

// export const getCurrentUser = async () => {
//     const { user, error } = await supabase.auth.user()

//     if (error) {
//         console.error("Getting user error: ", error)

//         throw error
//     }

//     return user
// }

export const user = supabase.auth.user()