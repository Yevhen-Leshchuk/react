import s from './ColorPicker.module.css';

function ColorPicker({ options }) {
  return (
    <div className={s.container}>
      <h2 className={s.title}>Color Picker</h2>
      <div>
        {options.map(option => (
          <span
            key={option.label}
            className={s.option}
            // Пример инлайн стилей, используеться для динамической вставки стилей.
            style={{ background: option.color }}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
