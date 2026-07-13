import { CONFIG } from 'src/config-global';

import { AcademicPeriodView } from 'src/sections/academic-period/view';

export default function Page() {
  return (
    <>
      <title>{`Academic Period - ${CONFIG.appName}`}</title>

      <AcademicPeriodView />
    </>
  );
}
