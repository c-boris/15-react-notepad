import { Card } from 'react-bootstrap'
import Showdown from 'showdown';

const converter = new Showdown.Converter();

const LeftDisplay = ({ data, handleChange, openCard, addNote }) => {

  const handleAddNote = () => {
    addNote();
  };

  return (
    <>
      <div className="text-center">
        <button type='submit' className='btn-custom-2' onClick={handleAddNote}>Ajouter une note</button>
      </div>
      {data.map((note, index) => {
        const noteDataHTML = converter.makeHtml(note.content);
        return (
          <Card id='card' key={index} onClick={() => openCard(index)}>
            <Card.Body>
              <Card.Title id='card-title'>{note.title}</Card.Title>
              <Card.Text className='limited-text' id='card-text'>
                <div dangerouslySetInnerHTML={{ __html: noteDataHTML }} />
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })
      }
    </>
  )
}

export default LeftDisplay;
