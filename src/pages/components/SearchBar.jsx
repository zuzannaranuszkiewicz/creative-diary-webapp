import { useState } from "react";
import { ProjectGroup, SelectProject } from "./Projects";
import { SelectTag } from "./Tags";
import { EntryGroup } from "./EntryGroup";
import { ProjectPage } from "../GroupAndProjectPage";

export function SearchBar(props){

    const {project, tag, inputType} = props;

    const [keywords, setKeywords] = useState('');
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [search, setSearch] = useState(false);

    const [searchKeywords, setSearchKeywords] = useState('');
    const [searchProjects, setSearchProjects] = useState([]);
    const [searchTags, setSearchTags] = useState([]);

    function performSearch(){
        setSearchKeywords(keywords);
        setSearchTags(selectedTags);
        if (tag && tag.length !== 0) {
            setSearchTags(tag);
        } else {
            setSearchTags(selectedTags);
        }

        if (project && project.length !== 0) {
            setSearchProjects(project);
        } else {
            setSearchProjects(selectedProjects);
        }
        setSearch(false);
        setShowResults(true);
    }

    return(
        <div>
            <input type="text"
                    placeholder="Search..."
                    onClick={()=> (setSearch(true))}
                    onChange={(e) => setKeywords(e.target.value)}/>

             {search && (
                <>
                {(!project || project.length === 0) && <SelectProject onProjectSelect={setSelectedProjects}/>}

                {(!tag || tag.length === 0) &&  <SelectTag onTagSelect={setSelectedTags}/>}
               

                <button onClick={performSearch}>Search</button>
                </>
             )}       

          
            <br/>

            {showResults && (
                <>
                {(!project || project.length === 0) && <ProjectGroup/>}
                <EntryGroup keywords={searchKeywords} projects={searchProjects} tags={searchTags} inputType={inputType}/>
                </>
                
            )}

            <hr></hr>
        </div>
    )
}