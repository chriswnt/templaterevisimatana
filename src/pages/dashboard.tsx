import { CONFIG } from 'src/config-global';

import { DashboardView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Dashboard - ${CONFIG.appName}`}</title>

      <DashboardView />
    </>
  );
}
