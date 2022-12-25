import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type FormInputType = {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  bgClass?: string;
  disabled?: boolean;
};

type Inputs = {
  example: string;
  exampleRequired: string;
};

const FormInput: FC<FormInputType> = ({
  name,
  label,
  type = 'text',
  bgClass,
  disabled = false,
  ...props
}) => {
  const {
    formState: { errors },
    control,
  }: any = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <label className="mb-4 block">
          <h3 className="mb-2 block text-dark font-medium text-base">
            {label}
          </h3>
          <input
            {...field}
            {...props}
            type={type}
            disabled={disabled}
            onWheel={(event: any) => event.target.blur()}
            className={`m-0 block w-full !bg-gray-200 px-3 py-2.5 text-base text-dark transition ease-in-out focus:outline-none ${
              disabled
                ? 'cursor-not-allowed bg-gray-100 opacity-70'
                : bgClass
                ? bgClass
                : 'bg-white'
            }`}
          />
          {errors?.[name]?.message ? (
            <div className="mt-2 text-sm text-red-500">
              {errors?.[name]?.message}
            </div>
          ) : null}
        </label>
      )}
    />
  );
};

export default FormInput;
