import { useFormContext } from 'react-hook-form';
import ReactInputVerificationCode from 'react-input-verification-code';
import useStore from '../../../store';
import { getLocalText } from '../../../utils/localsHandling/getLocalText';

const VerifyPhone = () => {
  const { language } = useStore((state) => state);
  const { watch, setValue } = useFormContext();
  const values = watch();

  return (
    <>
      <div className="px-3">
        <div className="text-center mb-8">
          <p>We’ve sent an SMS verification code to:</p>
          <p className="font-bold">{values?.number}</p>
          <p>(It expires in 2 minutes)</p>
        </div>
        <h3 className="font-medium mb-3">
          {getLocalText(language, 'verification.input.verification_code.label')}
        </h3>
        <div className="flex justify-center mb-4 verify-phone">
          <ReactInputVerificationCode
            length={6}
            onChange={(value) => {
              const isValid = !Number.isNaN(+value);
              isValid ? setValue('code', value) : null;
            }}
          />
        </div>
      </div>
    </>
  );
};

export default VerifyPhone;
