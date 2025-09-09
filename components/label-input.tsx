import { cn } from '@/lib/utils';
import { ComponentProps, RefObject, useId } from 'react';
import { Input } from './ui/input';

type Props = {
  label: string;
  type?: string;
  name?: string;
  ref?: RefObject<HTMLInputElement | null>;
  placeholder?: string;
  className?: string;
};

export default function LabelInput({
  label,
  type,
  name,
  ref,
  placeholder,
  className,
  ...props
}: Props & ComponentProps<'input'>) {
  const uniqName = useId();
  // const ref = useRef<HTMLInputElement>(null) //* type 설정을 위해 알아보는 법
  return (
    <label htmlFor={uniqName} className='text-sm font-normal capitalize'>
      {label}
      {/* name은 action으로 넘어갈 때 param name */}
      <Input
        type={type || 'text'}
        id={uniqName}
        name={name || uniqName}
        ref={ref}
        placeholder={placeholder}
        className={cn(
          'font-normal bg-gray-100 focus:bg-white',
          // { isActive: 'xx' },
          className
        )}
        {...props}
      ></Input>
    </label>
  );
}
