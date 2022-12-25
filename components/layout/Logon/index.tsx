import { yupResolver } from '@hookform/resolvers/yup';
import { Children, FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import useStore from '../../../store';
import { Button, SwitchLanguage } from '../../reusable';
import { handleEmailInput, handleVerifyPhone } from '../utils/handlers';

interface LogonInterface {
  initialValues: any;
  children: JSX.Element | JSX.Element[];
  onSubmit: any;
}

interface FormValues {
  email: string;
  number: string;
  code: string;
  sms_id: {
    result_1: string;
    verification_code: string;
  };
}

const Logon: FC<LogonInterface> = ({
  initialValues,
  children,
  onSubmit,
  ...props
}) => {
  // Store
  const { setLogin } = useStore((state) => state);

  // Managing steps
  const [step, setStep] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Finding current child, first step and last step
  const childrenArray = Children.toArray(children);
  const currentChild: any = childrenArray[step];
  const isFirstStep = step === 0;
  const isLastStep = childrenArray?.length - 1 === step;

  const formMethods = useForm({
    resolver: yupResolver(
      currentChild?.props?.validationSchema || yup.object().shape({})
    ),
    defaultValues: initialValues,
  });

  // Go next step
  const goNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Go back step
  const goBackStep = () => {
    setStep((prevStep) => (prevStep >= 1 ? prevStep - 1 : 0));
  };

  const onFormSubmit = async (values: FormValues) => {
    const stepKey = currentChild.props.stepKey;
    if (isLastStep) {
      await onSubmit({
        values,
        setIsLoading,
        setIsSuccess,
      });
    } else {
      setErrorMessage('');
      switch (stepKey) {
        case 'email-input':
          handleEmailInput({
            formMethods,
            values,
            goNextStep,
            setIsLoading,
            setErrorMessage,
          });
          break;

        case 'verify-phone':
          handleVerifyPhone({
            formMethods,
            values,
            goNextStep,
            setIsLoading,
            setErrorMessage,
            setLogin,
          });
          break;

        default:
          goNextStep();
          break;
      }
    }
  };
  return (
    <div className="relative flex flex-col h-screen w-full">
      <div className=" absolute pt-6 w-full flex justify-end px-4">
        <SwitchLanguage />
      </div>
      <div className="flex-1 flex justify-center items-center w-full">
        <div className="w-full">
          <FormProvider {...formMethods}>
            <form
              onSubmit={formMethods.handleSubmit((values) =>
                onFormSubmit(values)
              )}
            >
              <h2 className="text-center font-medium text-3xl mb-8">
                {currentChild?.props?.title}
              </h2>
              {errorMessage && (
                <div className="mb-4 mx-3 px-2 py-1 border border-red-300 text-sm text-red-500 bg-red-200">
                  {errorMessage == 'Verification code expired. Start again'
                    ? errorMessage + ' by refreshing.'
                    : errorMessage}
                </div>
              )}
              {currentChild}
              <div className="px-3">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="mt-2"
                  text={currentChild?.props?.btnText || 'Continue'}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Logon;
