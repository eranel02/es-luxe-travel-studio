import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { initialCrmState, type CrmState } from './crm-model';
const CrmContext = createContext<{ data: CrmState; setData: Dispatch<SetStateAction<CrmState>> } | null>(null);
export function CrmProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(initialCrmState);
  return <CrmContext.Provider value={{ data, setData }}>{children}</CrmContext.Provider>;
}
export function useCrm() {
  const value = useContext(CrmContext);
  if (!value) throw new Error('CRM provider is missing');
  return value;
}
