import "./button.styles.scss";

interface Button_Type {
  google: string;
  inverted: string;
}
const BUTTON_TYPE_CLASSES: Button_Type = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({
  children,
  buttonType,
  buttonProps,
}: {
  children: React.ReactNode;
  buttonType?: string;
  buttonProps?: any;
}) => {
  return (
    <button
      className={`button-container ${
        BUTTON_TYPE_CLASSES[buttonType as keyof typeof BUTTON_TYPE_CLASSES]
      }`}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
