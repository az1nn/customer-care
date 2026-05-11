import type {
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import styles from "./Ui.module.scss";
import { Input as BaseInput } from "@/components/light-portal-compat";

type TextProps = PropsWithChildren<{
  className?: string;
  xs?: boolean;
  sm?: boolean;
  md?: boolean;
  xl?: boolean;
  body?: boolean;
  bold?: boolean;
  inverse?: boolean;
  icon?: string;
}>;

type SubtitleProps = PropsWithChildren<{
  className?: string;
  xs?: boolean;
}>;

type AlertProps = PropsWithChildren<{
  success?: boolean;
  error?: boolean;
  light?: boolean;
}>;

type BreadcrumbItem = {
  page: string;
  url?: string;
};

type AccordionItem = {
  id?: string;
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  data: AccordionItem[];
};

type SpinnerProps = {
  isLoading?: boolean;
};

type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

const joinClasses = (...classNames: Array<string | false | null | undefined>) =>
  classNames.filter(Boolean).join(" ");

export const Text = ({
  children,
  className,
  xs,
  sm,
  md,
  xl,
  bold,
  inverse,
}: TextProps) => (
  <span
    className={joinClasses(
      styles.text,
      xs && styles.textXs,
      sm && styles.textSm,
      md && styles.textMd,
      xl && styles.textXl,
      bold && styles.bold,
      inverse && styles.inverse,
      className
    )}
  >
    {children}
  </span>
);

export const Subtitle = ({ children, className }: SubtitleProps) => (
  <h2 className={joinClasses(styles.subtitle, className)}>{children}</h2>
);

export const Divider = () => <hr className={styles.divider} />;

export const Alert = ({ children, error, success }: AlertProps) => (
  <div
    className={joinClasses(
      styles.alert,
      success && styles.alertSuccess,
      error && styles.alertError
    )}
    role="alert"
  >
    {children}
  </div>
);

export const Breadcrumb = ({ data }: { data: BreadcrumbItem[] }) => (
  <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
    {data.map((item, index) => (
      <span key={`${item.page}-${item.url ?? "current"}`}>
        {index > 0 ? " / " : null}
        {item.url ? (
          <a className={styles.breadcrumbItem} href={item.url}>
            {item.page}
          </a>
        ) : (
          <span>{item.page}</span>
        )}
      </span>
    ))}
  </nav>
);

export const Accordion = ({ data }: AccordionProps) => (
  <div className={styles.accordion}>
    {data.map((item) => (
      <details
        className={styles.accordionItem}
        key={
          item.id ??
          (typeof item.content === "string"
            ? item.content
            : typeof item.title === "string"
              ? item.title
              : "accordion-item")
        }
      >
        <summary className={styles.accordionSummary}>{item.title}</summary>
        <div className={styles.accordionContent}>{item.content}</div>
      </details>
    ))}
  </div>
);

export const Spinner = ({ isLoading }: SpinnerProps) =>
  isLoading ? (
    <span aria-label="Carregando" className={styles.spinner} role="status" />
  ) : null;

export const Checkbox = (props: CheckboxProps) => <input type="checkbox" {...props} />;

export const Input = (
  props: PropsWithChildren<
    InputHTMLAttributes<HTMLInputElement> & { text?: boolean }
  >
) => <BaseInput {...props} />;
