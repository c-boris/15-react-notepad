import Showdown from 'showdown';
const converter = new Showdown.Converter();

const NoteDisplay = ({ title, content }) => {
  const contentHTML = converter.makeHtml(content);

  return (
    <div className='NoteDisplay'>
      
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: contentHTML }} />
      
    </div>
  )

}

export default NoteDisplay;
