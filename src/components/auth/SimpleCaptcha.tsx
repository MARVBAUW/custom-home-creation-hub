
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

// Removed actual captcha functionality but kept the component structure
// to avoid breaking any imports or references
const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({ onVerify }) => {
  useEffect(() => {
    // Auto-verify to skip captcha completely
    onVerify(true);
  }, [onVerify]);

  // Return empty fragment to not render anything
  return <></>;
};

export default SimpleCaptcha;
