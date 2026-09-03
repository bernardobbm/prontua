import { tv, type VariantProps } from 'tailwind-variants';

interface TextInputProps {
  id?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  type: string;
  errorMessage: string | null;
}

const textInput = tv({
  base: 'focus:ring-primary-green-400 focus:ring-2 h-10 w-xs rounded-md border-2 border-zinc-300 bg-zinc-100 px-4 text-zinc-800 shadow-sm placeholder:text-zinc-500 focus:outline-none placeholder:text-sm',
  variants: {
    error: {
      true: 'border-primary-red-200',
    },
  },

  defaultVariants: {
    error: false,
  },
});

export function TextInput({
  id,
  name,
  type,
  placeholder,
  label,
  error,
  errorMessage,
  ...rest
}: TextInputProps & VariantProps<typeof textInput>) {
  return (
    <div className='flex w-xs flex-col gap-1'>
      {label ? (
        <label className='font-inter-medium text-zinc-900' htmlFor={id}>
          {label}
        </label>
      ) : null}
      <input
        type={type}
        placeholder={placeholder}
        className={textInput({ error })}
        name={name}
        id={id}
        {...rest}
      />

      {error && (
        <span className='text-primary-red-300 font-inter-semibold text-sm text-wrap'>
          {errorMessage}
        </span>
      )}
    </div>
  );
}
