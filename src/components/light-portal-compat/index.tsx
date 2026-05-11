import {
  type ButtonHTMLAttributes,
  type ChangeEventHandler,
  type InputHTMLAttributes,
  type PropsWithChildren,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import styles from "./LightPortalCompat.module.scss";

type WithPermissionId = {
  permissionId?: string;
};

type TextProps = PropsWithChildren<{
  body?: boolean;
  lg?: boolean;
  className?: string;
}>;

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & WithPermissionId
>;

type InputProps = PropsWithChildren<
  Omit<InputHTMLAttributes<HTMLInputElement>, "children" | "onChange"> &
    WithPermissionId & {
      text?: boolean;
      onChange?: ChangeEventHandler<HTMLInputElement>;
    }
>;

type ModalProps = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}>;

const joinClasses = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

export const AlertProvider = ({ children }: PropsWithChildren) => children;

export const AccessControl = ({ children }: PropsWithChildren<WithPermissionId>) =>
  children;

export const Text = ({ children, className, lg }: TextProps) => (
  <p className={joinClasses(styles.text, lg && styles.textLg, className)}>
    {children}
  </p>
);

export const Button = ({
  children,
  className,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={joinClasses(styles.button, className)}
    {...props}
  >
    {children}
  </button>
);

export const Input = ({ children, className, text: _text, ...props }: InputProps) => (
  <label className={styles.inputLabel}>
    <span>{children}</span>
    <input className={joinClasses(styles.input, className)} {...props} />
  </label>
);

export const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={styles.overlay}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="presentation"
    >
      <div
        aria-modal="true"
        aria-labelledby={title ? "light-portal-compat-modal-title" : undefined}
        className={styles.modal}
        role="dialog"
      >
        <div className={styles.header}>
          {title ? (
            <h2
              className={styles.title}
              id="light-portal-compat-modal-title"
            >
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            aria-label="Fechar modal"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
