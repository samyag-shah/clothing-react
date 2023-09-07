import "./formInput.styles.scss";

interface Props {
  label: string;
  inputProps: { [key: string]: any };
}

const FormInput = ({ label, inputProps }: Props) => {
  return (
    <div className="form-input-container">
      <label className="form-label">{label}</label>
      <input {...inputProps} />
    </div>
  );
};

export default FormInput;
