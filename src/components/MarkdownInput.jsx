import { useEffect, useState } from 'react';
import NoteDisplay from './NoteDisplay.jsx';
import LeftDisplay from './LeftDisplay.jsx';
import { Row, Col, Container } from 'react-bootstrap';

function MarkdownInput() {
  const [values, setValues] = useState({ title: '', content: '' });
  const [data, setData] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem('blocNotes');

    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setData(parsedNotes);
    }
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSave = () => {
    if (values.title || values.content) {
      const updatedData = [...data];
      if (selectedCardIndex !== null) {
        updatedData[selectedCardIndex] = { ...values };
      } else {
        updatedData.push(values);
      }
      setData(updatedData);
      localStorage.setItem('blocNotes', JSON.stringify(updatedData));
    }
  };

  const openCard = (index) => {
    setSelectedCardIndex(index);
    setValues(data[index]);
  };

  const addNote = () => {
    const newNote = { title: 'New Note', content: '' };
    const updatedData = [...data, newNote];
    setData(updatedData);
    localStorage.setItem('blocNotes', JSON.stringify(updatedData));
  };

  const handleDelete = () => {
    if (selectedCardIndex !== null) {
      const updatedData = [...data];
      updatedData.splice(selectedCardIndex, 1);
      setData(updatedData);
      localStorage.setItem('blocNotes', JSON.stringify(updatedData));
      setSelectedCardIndex(null);
      setValues({ title: '', content: '' });
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={2} style={{ height: '100vh' }}>
          <LeftDisplay data={data} handleChange={handleChange} openCard={openCard} addNote={addNote} />
        </Col>
        <Col md={10}>

          <Row style={{ height: '50%' }}>
            <div className="display" >
              <NoteDisplay title={values.title} content={values.content} />
            </div>
          </Row>

          <Row className="align-items-center justify-content-center" style={{ height: '50%' }}>
  <input style={{ width: '90%', height: '10%' }} value={values.title} onChange={handleChange('title')} />
  <textarea style={{ width: '90%', height: '70%' }} value={values.content} onChange={handleChange('content')} />
  <div className="col-11">
    <button type='submit' className='btn-custom' onClick={handleSave}>Save</button>
    <button type='submit' className='btn-custom' onClick={handleDelete}>Delete</button> {/* Nouveau bouton "Delete" */}
  </div>
</Row>

        </Col>
      </Row>
    </Container>
  );
}

export default MarkdownInput;
