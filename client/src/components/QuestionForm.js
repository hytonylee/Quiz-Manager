import React from 'react';

function QuestionForm(props){
  const { onSubmit = () => {} } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newQuestion = {
      body: formData.get('body'),
      quiz_id: formData.get
    };
    onSubmit(newQuestion);
  }

  return (
    <div className='QuestionForm'>
      <Form onSubmit={handleSubmit}>
        <Form.Field label='Qestion Description'
                    control='textarea'
                    row='5'
        />
        
        <Form.Field control='button'>Save Question</Form.Field>
      </Form>
      </div>

  )
}
export default QuestionForm;
