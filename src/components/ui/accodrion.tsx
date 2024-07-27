import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { createContext, FC, useContext, useState } from "react";

interface AccordionType extends React.HTMLAttributes<HTMLDivElement> {
  type?: "multi" | "single";
}

interface AccordionItemType
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  value: string | number;
}

const accordionVariants = cva("", {
  variants: {
    variant: {
      primary:
        "bg-slate-300 dark:bg-slate-600 text-slate-800 dark:text-slate-200",
      danger: "bg-red-300 dark:bg-red-600 text-red-800 dark:text-red-200",
      warning:
        "bg-yellow-300 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-200",
      info: "bg-blue-300 dark:bg-blue-600 text-blue-800 dark:text-blue-200",
      success:
        "bg-green-300 dark:bg-green-600 text-green-800 dark:text-green-200",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

const accordionTriggerVariants = cva(
  "border-l-[6px] flex justify-between items-center px-5 py-1 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-slate-500 dark:bg-slate-300 text-slate-100 dark:text-slate-800 border-slate-800 dark:border-slate-100",
        danger:
          "bg-red-500 dark:bg-red-300 text-red-100 dark:text-red-800 border-red-800 dark:border-red-100",
        warning:
          "bg-yellow-500 dark:bg-yellow-300 text-yellow-100 dark:text-yellow-800 border-yellow-800 dark:border-yellow-100",
        info: "bg-blue-500 dark:bg-blue-300 text-blue-100 dark:text-blue-800 border-blue-800 dark:border-blue-100",
        success:
          "bg-green-500 dark:bg-green-300 text-green-100 dark:text-green-800 border-green-800 dark:border-green-100",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface AccordionTriggerType extends React.HTMLAttributes<HTMLDivElement> {}
interface AccordionContentType extends React.HTMLAttributes<HTMLDivElement> {}

const AccordionContext = createContext<any>(null);

const Accordion: FC<AccordionType> = ({ type = "multi", ...props }) => {
  const [valueOpen, setValueOpen] = useState<string | number[]>([]);

  return (
    <AccordionContext.Provider value={{ valueOpen, setValueOpen, type }}>
      <div className="flex flex-col gap-3" {...props} />
    </AccordionContext.Provider>
  );
};

const AccordionItemContext = createContext<any>(null);

const AccordionItem: FC<AccordionItemType> = ({
  className,
  variant,
  value,
  ...props
}) => {
  return (
    <AccordionItemContext.Provider value={{ variant, value }}>
      <div {...props} className={accordionVariants({ variant, className })} />
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger: FC<AccordionTriggerType> = ({ ...props }) => {
  const { valueOpen, setValueOpen, type } = useContext(AccordionContext);
  const { value, variant } = useContext(AccordionItemContext);

  const handleTrigger = () => {
    if (type === "multi") {
      if (valueOpen.includes(value)) {
        const filter = valueOpen.filter((v: any) => v !== value);
        setValueOpen(filter);
      } else {
        setValueOpen([...valueOpen, value]);
      }
    } else if (type === "single") {
      if (valueOpen.includes(value)) {
        setValueOpen([]);
      } else {
        setValueOpen([value]);
      }
    }
  };

  return (
    <div
      className={accordionTriggerVariants({ variant })}
      onClick={handleTrigger}
      {...props}
    >
      <span>{props.children}</span>
      <span
        className={clsx(
          "text-lg duration-150 origin-bottom-center size-5 p-1 flex justify-center items-center",
          {
            "rotate-[45deg]": valueOpen.includes(value),
          }
        )}
      >
        +
      </span>
    </div>
  );
};

const AccordionContet: FC<AccordionContentType> = ({ ...props }) => {
  const { valueOpen } = useContext(AccordionContext);
  const { value } = useContext(AccordionItemContext);

  return valueOpen.includes(value) && <div className="p-5" {...props} />;
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContet };
