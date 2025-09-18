import z from 'zod';

export type ValidError = Record<
  string,
  { errors: string[]; value?: FormDataEntryValue | null } // File이 올 수도 있기 때문에 String이 아닌 FormDataEntryValue 로 타입을 잡는다. 파일을 선택 안한 경우를 고려해 null도 포함
>;

// export type ValidError = {
//   success: false;
//   error: Record<
//     string,
//     { errors: string[]; value?: FormDataEntryValue | null }
//   >;
// };

export const validate = <T extends z.ZodObject>(
  zobj: T,
  formData: FormData
): [ValidError] | [undefined, z.core.output<T>] =>
  validateObject(zobj, Object.fromEntries(formData.entries()));

export const validateObject = <T extends z.ZodObject>(
  zobj: T,
  obj: Record<string, FormDataEntryValue | string | unknown>
): [ValidError] | [undefined, z.core.output<T>] => {
  const validator = zobj.safeParse(obj);

  if (!validator.success) {
    // const err1 = validator.error.flatten(); // deprecated
    // console.log(err1);
    const err = z.treeifyError(validator.error).properties as ValidError;
    for (const [prop, value] of Object.entries(obj)) {
      if (prop.startsWith('$')) continue;
      if (!err[prop]) err[prop] = { errors: [] };
      err[prop].value = value as string;
      // err[prop] = { ...(err[prop] ?? { errors: [] }), value };
    }
    console.log('🐼 ~ err:', err);
    return [err];
  } else {
    return [undefined, validator.data];
  }
};
