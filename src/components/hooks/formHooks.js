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
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const {name, value, checked} = event.target;
    const dietId = parseInt(value); // real DB id, not index

    setInputs((prev) => {
      const updatedArray = checked
        ? [...prev[name], dietId]
        : prev[name].filter((id) => id !== dietId);

      return {
        ...prev,
        [name]: updatedArray,
      };
    });
  };

  const resetForm = () => {
    setInputs(initState);
  };

  return {
    handleSubmit,
    handleInputChange,
    handleCheckboxChange,
    inputs,
    resetForm,
  };
};

export default useForm;
