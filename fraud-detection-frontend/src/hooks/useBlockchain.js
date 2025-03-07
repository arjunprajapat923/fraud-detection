import { useEffect, useState } from 'react';
import { getContract } from '../services/blockchain';

export const useBlockchain = () => {
  if (typeof useState !== 'function') {
    throw new Error('React hooks not available - check React import');
  }

  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const init = async () => {
      try {
        const contract = await getContract();
        if (!contract?.runner) throw new Error('Wallet not connected');
        
        if (isMounted) {
          setAccount(await contract.runner.getAddress());
          setContract(contract);
        }
      } catch (err) {
        if (isMounted) setError(err.message);
      }
    };

    init();
    return () => { isMounted = false; };
  }, []);

  return { contract, account, error };
};