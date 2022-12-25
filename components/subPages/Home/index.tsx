import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useStore from '../../../store';
import { getLocalText } from '../../../utils/localsHandling/getLocalText';
import getRequest from '../../../utils/request/getRequest';
import { Button } from '../../reusable';

const Home = () => {
  const { auth, language, setLogout } = useStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    getRequest(
      'auth/signout',
      {
        Authorization: auth?.token,
      },
      {}
    )
      .then((response) => {
        console.log(response);
        setLogout();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="px-3">
      <Link href="/edit-profile">
        <div className="relative mx-auto w-20 rounded-full overflow-hidden aspect-square mb-4">
          {auth?.user?.avatar?.url ? (
            <Image
              src={auth?.user?.avatar?.url}
              className="object-cover"
              fill
              alt="Profile"
            />
          ) : null}
        </div>
      </Link>
      <h3 className="text-center text-xl">
        {getLocalText(language, 'dashboard.welcome.text')}
      </h3>
      <div className="space-y-2 my-4">
        <p className="">Name: {auth?.user?.full_name}</p>
        <p className="">Email: {auth?.user?.email}</p>
        <p className="">Number: {auth?.user?.number}</p>
        <p className="">Role: {auth?.user?.role}</p>
      </div>
      <div className="space-y-4">
        {auth?.user?.role == 'Manager' ? (
          <Button
            text={getLocalText(
              language,
              'dashboard.button.submit.label.manager'
            )}
            type="button"
          />
        ) : auth?.user?.role == 'Team Leader' ? (
          <Button
            text={getLocalText(language, 'dashboard.button.submit.label.team')}
            type="button"
          />
        ) : null}
        <Button
          text={getLocalText(language, 'dashboard.button.submit.label')}
          onClick={handleLogout}
          isLoading={isLoading}
          type="button"
        />
      </div>
    </div>
  );
};

export default Home;
