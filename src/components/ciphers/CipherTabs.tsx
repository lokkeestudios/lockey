import { Tab } from '@headlessui/react';
import { classNames } from '../../utils/textUtils';

import CaesarCipher from './CaesarCipher';
import RsaCipher from './RsaCipher';
import SubstitutionCipher from './SubstitutionCipher';
import VigenereCipher from './VigenereCipher';

const cipherTabs = [
  {
    name: 'Caesar',
    component: <CaesarCipher />,
  },
  {
    name: 'Vigenère',
    component: <VigenereCipher />,
  },
  {
    name: 'Substitution',
    component: <SubstitutionCipher />,
  },
  {
    name: 'RSA',
    component: <RsaCipher />,
  },
];

export default function CipherTabs() {
  return (
    <Tab.Group>
      <Tab.List className="mb-8 flex rounded-lg bg-neutrals-900 shadow md:mb-12">
        {cipherTabs.map((cipherTab) => (
          <Tab
            key={cipherTab.name}
            className={({ selected }) =>
              classNames(
                'inline-block w-full rounded-l-lg p-3 text-center text-sm font-bold focus:outline-none md:text-base lg:p-4',
                selected
                  ? 'rounded-lg bg-gradient-to-r from-brand to-brand-light text-neutrals-50 shadow'
                  : 'bg-transparent text-neutrals-300'
              )
            }
          >
            {cipherTab.name}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="rounded-lg bg-neutrals-900 p-8 shadow">
        {cipherTabs.map((cipherTab) => (
          <Tab.Panel key={cipherTab.name}>{cipherTab.component}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
