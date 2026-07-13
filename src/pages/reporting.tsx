import { CONFIG } from 'src/config-global';

import { ReportingView } from 'src/sections/reporting/view';

export default function Page() {
  return (
    <>
      <title>{`Reporting - ${CONFIG.appName}`}</title>

      <ReportingView />
    </>
  );
}
