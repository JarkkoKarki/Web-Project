import {useState} from 'react';

const useForm = (callback, initState) => {
  const [inputs, setInputs] = useState(initState);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  const handleInputChange = (event) => {
    event.persist();
    console.log('handleInputChange', event.target.name, event.target.value);
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useForm;
