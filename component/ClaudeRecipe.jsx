import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props){
    return (
        <section className="recomend">
            <h2>Chef Claude Recommend:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}


