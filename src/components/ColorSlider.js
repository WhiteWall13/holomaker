import React from 'react'

function ColorSlider({ onColorChange }) {
  const handleColorChange = (event) => {
    onColorChange(event.target.value);
  };

  return (
    <div>
      <input type="color" onChange={handleColorChange} />
    </div>
  )
}

export default ColorSlider;
