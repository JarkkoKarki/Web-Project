// Reservaiton.jsx tiedostoo varten
export const formatDate = (date) => {
  if (date) {
    return date.toLocaleDateString();
  }
};

export const formatTime = (time) => {
  if (time) {
    return `${time.getHours().toString().padStart(2, '0')}:${time
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }
};
