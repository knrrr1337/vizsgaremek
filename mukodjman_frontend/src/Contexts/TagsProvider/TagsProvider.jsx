import {useState, createContext} from "react"

export const TagsContext = createContext()

export function TagsProvider({children}) {
    
    const [tags, setTags] = useState([])
    
    return <TagsContext.Provider value={tags}>
        {children}
    </TagsContext.Provider>
}