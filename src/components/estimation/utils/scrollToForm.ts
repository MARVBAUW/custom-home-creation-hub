
export const scrollToForm = () => {
  const formElement = document.getElementById('estimation-form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};
