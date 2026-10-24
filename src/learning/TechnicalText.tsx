// Keep prose in Raleway and make identifiers, SQL and numeric data distinct.
const tokens=/([A-Za-z_][A-Za-z_0-9@.]*\([^\n()]*\)|[A-Za-z_][A-Za-z_0-9@.]*|-?\d+(?:[.,]\d+)?%?)/g
export function TechnicalText({text}:{text:string}){
 return <>{text.split(tokens).map((part,i)=>i%2?<code key={i}>{part}</code>:part)}</>
}
