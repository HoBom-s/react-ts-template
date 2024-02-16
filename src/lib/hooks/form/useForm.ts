import { useMemo, ChangeEvent, useState } from "react";

interface Params<T> {
  [key: string]: {
    type: string;
    name: string;
    value: T;
    required: boolean;
    errMsg?: string;
    validate: (v: T) => boolean;
  };
}

/**
 * @example
 *    const { formValue } = useForm({
 *      username: {
 *        type: "text",
 *        name: "username",
 *        value: "",
 *        required: true,
 *        errMsg: "Invalid username",
 *        validate: (username) => username.length > 1,
 *      },
 *      password: {
 *        type: "password",
 *        name: "password",
 *        value: "",
 *        required: true,
 *        errMsg: "Invalid password",
 *        validate: (password) => password.length > 1,
 *      },
 *    });
 *
 *
 * @param {Params<T>} initialValue
 */
export const useForm = <T>(initialValue: Params<T>) => {
  const [formValue, setFormValue] = useState(initialValue);

  const isValidFormValue = useMemo(() => {
    return Object.keys(formValue).every((v) =>
      formValue[v].validate(formValue[v].value),
    );
  }, [formValue]);

  const handleFormValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!formValue[name].validate(value as T)) {
      return;
    }

    setFormValue((prevFormValue: Params<T>) => {
      return {
        ...prevFormValue,
        [name]: {
          ...prevFormValue[name],
          value: value as T,
        },
      };
    });
  };

  const handleFormReset = () => {
    setFormValue(initialValue);
  };

  return {
    formValue,
    isValidFormValue,
    handleFormValueChange,
    handleFormReset,
  };
};
