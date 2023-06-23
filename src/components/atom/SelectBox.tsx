import dynamic from 'next/dynamic'
export const SelectBox = dynamic(() => import('./ClientSelectBox').then(mod => mod.ClientSelectBox), { ssr: false });