import React from 'react';
import { Storage } from 'aws-amplify';
import { CircularProgress } from '@material-ui/core';

interface S3ImageFieldProps {
  source?: string;
  record?: Record<string, any>;
  label?: string;
}

export const S3ImageField: React.FC<S3ImageFieldProps> = ({ record = {} }) => {
  // store the S3 signed URL in state for use in return
  const [src, set] = React.useState<string | undefined>();
  const { key, identityId, level } = record;

  // Listen for changes on
  React.useEffect(() => {
    if (key && !key.match(/blob|http/i)) {
      // if level has been passed down, add the appropriate options.
      const options =
        level === 'protected' || level === 'private'
          ? { level, identityId }
          : {};

      // get the URL and set it in state
      Storage.get(key, options).then(result => {
        if (typeof result === 'string') {
          set(result);
        }
      });
    }
  }, [key, level, identityId]);

  // if there's no source and there is a key, show a loading spinner
  if (!src && key) {
    return <CircularProgress />;
  }

  // if there's a src, show the image!
  if (src) {
    return <img src={src} />;
  }

  // otherwise do nothing
  return null;
};
