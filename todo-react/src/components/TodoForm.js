import React from "react";
import Axios from 'axios';

function TodoForm({ addTodo, handleSubmit }) {
  const [value, setValue] = React.useState("");
  const [errors, setErrors] = React.useState({
    title: {
      error: '',
      pristine: true,
    }
  });

  const handleChange = (e) => {
    const { value } = e.target
    setValue(value);
    // console.log(value.length)
    value.length > 0 && setErrors({ ...errors, [e.target.name]: { error: '', pristine: false } })
    value.length <= 0 && setErrors({ ...errors, [e.target.name]: { error: 'Must be filled', pristine: false } })
  }

  const clearAndSubmit = async () => {
    if (errors.title.error.length > 0 || value.length <= 0) {
      return;
    } else {
      const resp = await Axios.post('http://localhost:3002/todos', { title: value, token: window.localStorage.getItem('auth-token') })
      handleSubmit();
      setValue('');
    }
  }
  return (
    <div className="formSection">
      <div className="formGroup">
        <input
          type='text'
          className='inputField'
          value={value}
          name="title"
          onChange={handleChange}
          placeholder='Enter your task here'
        />
        {
          !errors.title.pristine && errors.title.error.length > 0 && <div className="errorMsg">{errors.title.error}</div>
        }
      </div>
      <button className={`submit ${errors.title.error.length > 0 || value.length <= 0 ? 'disabledButton' : ''}`} onClick={clearAndSubmit}>
        Add
      </button>
    </div>
  );
}
export default TodoForm;
