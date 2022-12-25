import Head from 'next/head';
import { FC, useEffect, useState } from 'react';
import * as yup from 'yup';
import useStore from '../../store';
import { getLocalText } from '../../utils/localsHandling/getLocalText';
import { FormStep, SwitchLanguage } from '../reusable';
import Logon from './Logon';
import EmailInput from './Logon/EmailInput';
import VerifyPhone from './Logon/VerifyPhone';

const Layout: FC<{ children: JSX.Element; title?: string }> = ({
  children,
  title,
}) => {
  const { auth, language } = useStore((state) => state);

  const [isHydrated, setIsHydrated] = useState(false);

  //Wait till NextJS rehydration completes
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? (
    <div className="h-screen max-w-[450px] min-h-[500px] mx-auto sm:shadow-md sm:px-3">
      {/* Here I'm checking that the user is logged in or not  */}
      {auth?.isLoggedIn ? (
        <>
          <Head>
            <title>{title}</title>
          </Head>
          <div className=" py-6 w-full flex justify-between px-4">
            <h1 className="font-medium text-[27px] sm:text-3xl">{title}</h1>
            <SwitchLanguage />
          </div>
          {children}
        </>
      ) : (
        <>
          <Head>
            <title>Login</title>
          </Head>
          <Logon
            initialValues={{ email: '', number: '', code: '', sms_id: {} }}
            onSubmit={() => {
              console.log('Hello');
            }}
          >
            <FormStep
              title={getLocalText(language, 'login.heading')}
              btnText={getLocalText(language, 'login.button.submit.label')}
              stepKey="email-input"
              validationSchema={yup.object({
                email: yup
                  .string()
                  .email('This is not a valid email address!')
                  .required('This field is required!'),
              })}
            >
              <EmailInput />
            </FormStep>
            <FormStep
              title={getLocalText(language, 'verification.heading')}
              btnText={getLocalText(
                language,
                'verification.button.submit.label'
              )}
              stepKey="verify-phone"
              validationSchema={yup.object({
                code: yup
                  .string()
                  .min(6)
                  .max(6)
                  .required('This field is required!'),
              })}
            >
              <VerifyPhone />
            </FormStep>
            <FormStep></FormStep>
          </Logon>
        </>
      )}
    </div>
  ) : null;
};

export default Layout;
