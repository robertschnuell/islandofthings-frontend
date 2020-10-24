import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

const Stream = () => {
  const { t, i18n } = useTranslation(['translation', 'stream']);
  return (
    <section className="stream copy">
      <p><Trans i18nKey="stream:p0">You can use <strong>/stream</strong> for broadcasting your video (a webcam or your desktop) and audio (your voice via microphone or your music for example) to the internet.</Trans></p>
      <p>{t('stream:p1')}</p>
      <p>{t('stream:p2')}</p>
      <p><Trans i18nKey="stream:p3"><del><strong>/stream</strong> can be accessed via: <a href="https://stream.medienhaus.udk-berlin.de" rel="external nofollow noopener noreferrer" target="_blank">stream.medienhaus.udk-berlin.de</a></del></Trans></p>
      <p><Trans i18nKey="stream:p4">NOTE: Until we finished updating and renewing our live streaming service, you can use our testing instance via: <a href="https://cast.medienhaus.udk-berlin.de" rel="external nofollow noopener noreferrer" target="_blank">cast.medienhaus.udk-berlin.de</a></Trans></p>
    </section>
  );
}

export default Stream;
