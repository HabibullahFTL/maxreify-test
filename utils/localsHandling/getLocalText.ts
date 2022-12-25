import enLocals from '../../local/en.json';
import roLocals from '../../local/ro.json';
export const getLocalText = (language: string, key: string) => {
  const enObject = JSON.parse(JSON.stringify(enLocals));
  const roObject = JSON.parse(JSON.stringify(roLocals));
  return language == 'en' ? enObject?.[key] : roObject?.[key];
};
