import { UserAuth } from "../../authentication/context/AuthContext";
import { GetEntries} from "./functions/functions";
import { EntryCard } from "./Entry";


export function EntryGroup(){
    const { user } = UserAuth();
    const entries = GetEntries(user.uid);

    return (
        <div>
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      );
    }
