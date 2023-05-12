import dynamic from 'next/dynamic'
export const TextBox = dynamic(() => import('./ClientTextBox').then(mod => mod.ClientTextBox), { ssr: false });