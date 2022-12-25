import useStore from '../../../store';
import { getLocalText } from '../../../utils/localsHandling/getLocalText';
import { FormInput } from '../../reusable';

const EmailInput = () => {
  const { language } = useStore((state) => state);
  return (
    <>
      <div className="px-3">
        <FormInput
          name="email"
          label={getLocalText(language, 'login.input.email.label')}
          placeholder={getLocalText(language, 'login.input.email.placeholder')}
        />
      </div>
    </>
  );
};

export default EmailInput;
