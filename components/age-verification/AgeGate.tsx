'use client';

import { useState, useEffect } from 'react';
import { AgeVerificationModal } from './AgeVerificationModal';
import { isAgeVerified } from '@/lib/utils/age-verification';

interface AgeGateProps {
  children: React.ReactNode;
}

export function AgeGate({ children }: AgeGateProps) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check verification status on mount
    const verified = isAgeVerified();
    setIsVerified(verified);
    setShowModal(!verified);
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
    setShowModal(false);
  };

  // Show nothing while checking verification status to prevent flash
  if (isVerified === null) {
    return null;
  }

  return (
    <>
      <AgeVerificationModal isOpen={showModal} onVerified={handleVerified} />
      {children}
    </>
  );
}
