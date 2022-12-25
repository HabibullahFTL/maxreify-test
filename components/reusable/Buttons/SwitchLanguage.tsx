import useStore from '../../../store';

const SwitchLanguage = () => {
  const { language, changeLanguage } = useStore((state) => state);
  return (
    <button
      onClick={changeLanguage}
      className="bg-gray-300 w-10 h-10 rounded-full"
    >
      {language == 'ro' ? 'EN' : 'RO'}
    </button>
  );
};

export default SwitchLanguage;
