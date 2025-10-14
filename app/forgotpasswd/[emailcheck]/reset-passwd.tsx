'use client';

import { useActionState } from 'react';
import { resetPassword } from '@/app/sign/sign.action';
import LabelInput from '@/components/label-input';
import { Button } from '@/components/ui/button';

type Props = {
  email: string;
  emailcheck: string;
};

export default function ResetPasswd({ email, emailcheck }: Props) {
  const [validError, resetPasswordAction, isPending] = useActionState(
    resetPassword,
    undefined
  );

  const sendAction = (formData: FormData) => {
    formData.set('email', email);
    formData.set('emailcheck', emailcheck);
    resetPasswordAction(formData);
  };

  return (
    <form action={sendAction} className=''>
      <LabelInput
        label='new password'
        name='passwd'
        type='password'
        focus={true}
        error={validError}
        placeholder='New Password...'
      />
      <LabelInput
        label='new password confirm'
        name='passwd2'
        type='password'
        error={validError}
        placeholder='New Password Confirm...'
        className='my-5'
      />
      <Button
        type='submit'
        variant={'destructive'}
        disabled={isPending}
        className='w-full my-5'
      >
        Change Password
      </Button>
    </form>
  );
}
