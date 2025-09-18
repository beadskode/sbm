/** biome-ignore-all lint/correctness/useExhaustiveDependencies: useEffect dep-arr */
'use client';
import {
  type ComponentProps,
  type RefObject,
  useEffect,
  useId,
  useRef,
} from 'react';
import { cn } from '@/lib/utils';
import type { ValidError } from '@/lib/validator';
import { Input } from './ui/input';

type Props = {
  label: string;
  type?: string;
  name?: string;
  ref?: RefObject<HTMLInputElement | null>;
  defaultValue?: string | number;
  focus?: boolean;
  error?: ValidError | undefined;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
};

export default function LabelInput({
  label,
  type,
  name,
  ref,
  defaultValue,
  focus,
  error,
  placeholder,
  className,
  inputClassName,
  ...props
}: Props & ComponentProps<'input'>) {
  const uniqName = useId();
  const inpRef = useRef<HTMLInputElement>(null); // hook은 버추얼 DOM이 관리.
  const err = !!error && name && error[name] ? error[name]?.errors : [];
  const val =
    !!error && name && error[name] ? error[name].value?.toString() : '';
  // const ref = useRef<HTMLInputElement>(null) //* type 설정을 위해 알아보는 법
  useEffect(() => {
    // CPU 성능 최적화를 위한 조건 분기
    if (!focus && !err.length) return;

    const keys = Object.keys(error ?? {});
    if (!focus && (!err.length || keys[0] !== name)) return;

    if (ref) ref.current?.focus();
    else inpRef.current?.focus();
  }, [err]);
  return (
    <div className={cn(className)}>
      <label htmlFor={uniqName} className='font-semibold text-sm capitalize'>
        {label}
        {/* name은 action으로 넘어갈 때 param name */}
        <Input
          type={type || 'text'}
          id={uniqName}
          name={name || uniqName}
          ref={ref || inpRef}
          defaultValue={val || defaultValue}
          placeholder={placeholder}
          className={cn(
            'bg-gray-100 font-normal focus:bg-white',
            // { isActive: 'xx' },
            inputClassName
          )}
          {...props}
        ></Input>
        {err.map(e => (
          <small key={e} className='ml-1 text-red-400'>
            {e}
          </small>
        ))}
      </label>
    </div>
  );
}
