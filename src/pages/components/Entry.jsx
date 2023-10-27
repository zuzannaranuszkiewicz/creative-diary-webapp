import { useNavigate } from "react-router-dom"

export function EntryCard({entry}){
    // navigate to "entry" page after clicking on it
    const navigate = useNavigate();
    function handleClick(){
        navigate(`/${entry.id}`)
    }

    return(
              <div key={entry.id} className="card">
                <h2>{entry.inputType}</h2>
                <p>{entry.title}</p>
                <p>{new Date(entry.timestamp).toLocaleDateString('en-GB')}</p>
                <p>{entry.text}</p>
              </div>
            );
}

export function EntryPreview(){
    
}